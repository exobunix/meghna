"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Send, Image as ImageIcon, Heart, Sparkles, X, Loader2, Plus, Camera } from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "@/utils/sound";

interface Note {
  id: string;
  sender: string;
  message: string;
  tag: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
}

export default function LoveNotesWall() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [tag, setTag] = useState("Love ❤️");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tags = ["Love ❤️", "Memory 📸", "Shayari 🌸", "Promise ✨", "Smile 😊"];

  // Fetch notes from MongoDB Atlas
  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data?.notes) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setImagePreview(url);
    }
  };

  const handleLike = (noteId: string) => {
    sounds.playHeartChime();
    setLikedMap((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            likes: likedMap[noteId] ? n.likes - 1 : n.likes + 1,
          };
        }
        return n;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    let uploadedUrl = "";

    try {
      // 1. If user selected a file, upload to ImageKit
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", `meghna_note_${Date.now()}`);
        formData.append("folder", "/meghna_notes");

        const uploadRes = await fetch("/api/imagekit/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedUrl = uploadData.url;
        }
      }

      // 2. Save note to MongoDB Atlas
      const noteRes = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: sender.trim() || "Adarsh",
          message: message.trim(),
          tag,
          imageUrl: uploadedUrl,
        }),
      });

      const noteData = await noteRes.json();
      if (noteData.note) {
        setNotes((prev) => [noteData.note, ...prev]);
        sounds.playSuccess();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FF4D6D", "#FF758F", "#FF8FA3", "#FFD166"],
        });
      }

      // Reset form
      setSender("");
      setMessage("");
      setFile(null);
      setImagePreview("");
      setModalOpen(false);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="notes" className="relative scroll-mt-28 pt-36 pb-28 md:pt-40 md:pb-36 px-4 bg-gradient-to-b from-[#FFFDFB] via-[#FFF0F4] to-[#FFF8F8] overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF758F]/15 via-[#FFB3C1]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#FF758F]/30 text-[#8B1E3F] text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm"
          >
            <MessageSquareHeart className="w-4 h-4 text-[#FF4D6D]" />
            <span>Living Memory Vault</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair-luxury text-3xl sm:text-4xl md:text-6xl font-bold text-[#3D0C1A] mb-4"
          >
            Whispers & Love Notes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif-luxury text-base sm:text-lg text-[#7C3F58] max-w-xl mx-auto"
          >
            Every sweet little thought, shayari, and memory preserved forever in our cloud love capsule.
          </motion.p>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => {
                sounds.playPop();
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#E63946] text-white font-medium shadow-lg shadow-[#FF4D6D]/25 hover:shadow-xl hover:shadow-[#FF4D6D]/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Leave a Note for Meghna</span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            </button>
          </motion.div>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#A85870]">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF4D6D]" />
            <p className="font-serif-luxury text-sm">Opening our memory vault…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, idx) => (
              <motion.div
                key={note.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#FFD0DB]/60 shadow-md shadow-[#FF4D6D]/5 hover:shadow-xl hover:shadow-[#FF4D6D]/15 transition-all flex flex-col justify-between group"
              >
                {/* Pin ornament */}
                <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-[#FF4D6D]/20 border border-[#FF4D6D]/40 flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#FF4D6D]" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#FFF0F3] text-[#A61E4D] font-medium border border-[#FFD0DB]/80">
                      {note.tag}
                    </span>
                    <span className="text-[11px] text-[#A85870] font-sans">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="font-serif-luxury text-base text-[#3A101D] leading-relaxed mb-4 whitespace-pre-line">
                    “{note.message}”
                  </p>

                  {/* Photo: Unclipped with soft ambient backdrop - Always displayed */}
                  <div className="relative mb-4 rounded-xl overflow-hidden border border-[#FFE0E6] shadow-xs bg-[#FFF5F7] h-52">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        note.imageUrl && !note.imageUrl.includes("polaroid1.jpg") && note.imageUrl.trim() !== ""
                          ? note.imageUrl
                          : ["/images/meghna/Image-30109.jpg", "/images/meghna/Image-44415.jpg", "/images/meghna/Image-16162.jpg", "/images/meghna/Image-76778.jpg", "/images/meghna/Image-54970.jpg"][idx % 5]
                      }
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/meghna/Image-30109.jpg";
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        note.imageUrl && !note.imageUrl.includes("polaroid1.jpg") && note.imageUrl.trim() !== ""
                          ? note.imageUrl
                          : ["/images/meghna/Image-30109.jpg", "/images/meghna/Image-44415.jpg", "/images/meghna/Image-16162.jpg", "/images/meghna/Image-76778.jpg", "/images/meghna/Image-54970.jpg"][idx % 5]
                      }
                      alt="Memory preview"
                      className="relative z-10 w-full h-full object-contain p-1 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/meghna/Image-30109.jpg";
                      }}
                    />
                  </div>
                </div>

                {/* Footer of card */}
                <div className="pt-3 border-t border-[#FFF0F3] flex items-center justify-between text-xs text-[#8B4459]">
                  <span className="font-semibold text-[#8B1E3F] flex items-center gap-1">
                    <span>— {note.sender}</span>
                  </span>

                  <button
                    onClick={() => handleLike(note.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-[#FFF0F3] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        likedMap[note.id] ? "fill-[#FF4D6D] text-[#FF4D6D]" : "text-[#A85870]"
                      }`}
                    />
                    <span className="font-medium">{note.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating a note */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#FFD0DB] max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#7C3F58] hover:bg-[#FFF0F3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-[#FF4D6D] fill-[#FF4D6D]" />
                <h3 className="font-playfair-luxury text-2xl font-bold text-[#3D0C1A]">
                  A Note for Meghna
                </h3>
              </div>
              <p className="font-serif-luxury text-sm text-[#7C3F58] mb-6">
                This message and photo will be securely stored in our cloud memory vault.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sender Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B1E3F] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adarsh"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FA] border border-[#FFD0DB] text-[#3D0C1A] placeholder-[#B58A99] focus:outline-none focus:border-[#FF4D6D] transition-colors"
                  />
                </div>

                {/* Category Tags */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B1E3F] uppercase tracking-wider mb-1.5">
                    Tag
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTag(t)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          tag === t
                            ? "bg-[#FF4D6D] text-white border-[#FF4D6D] shadow-sm shadow-[#FF4D6D]/30"
                            : "bg-[#FFF0F3] text-[#8B1E3F] border-[#FFD0DB] hover:bg-[#FFE3E8]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B1E3F] uppercase tracking-wider mb-1.5">
                    Your Message / Shayari
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write a heartfelt line, inside joke, or loving thought for Meghna…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF9FA] border border-[#FFD0DB] text-[#3D0C1A] placeholder-[#B58A99] focus:outline-none focus:border-[#FF4D6D] transition-colors resize-none font-serif-luxury text-sm"
                  />
                </div>

                {/* ImageKit Photo Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B1E3F] uppercase tracking-wider mb-1.5">
                    Attach Memory Photo (ImageKit Cloud)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative h-44 rounded-xl overflow-hidden border border-[#FFD0DB] bg-[#FFF5F7] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xs opacity-25 scale-110 pointer-events-none"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Selected memory"
                        className="relative z-10 w-full h-full object-contain p-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setImagePreview("");
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-[#FFD0DB] hover:border-[#FF4D6D] rounded-xl flex flex-col items-center justify-center gap-1.5 text-[#8B4459] hover:bg-[#FFF9FA] transition-all cursor-pointer"
                    >
                      <Camera className="w-5 h-5 text-[#FF758F]" />
                      <span className="text-xs font-medium">Click to select photo</span>
                      <span className="text-[10px] text-[#A85870]">Optimized & delivered via ImageKit CDN</span>
                    </button>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4D6D] to-[#E63946] text-white font-medium shadow-md shadow-[#FF4D6D]/30 hover:shadow-lg hover:shadow-[#FF4D6D]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Preserving in Cloud…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Save to Love Vault</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
