import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export default imagekit;

/**
 * Returns client-side authentication parameters required by ImageKit front-end SDKs
 */
export function getImageKitAuthParams() {
  return imagekit.getAuthenticationParameters();
}

/**
 * Helper to build optimized ImageKit URLs with dynamic transformation
 */
export function buildImageUrl(path: string, options?: { width?: number; height?: number; quality?: number; blur?: number }): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const endpoint = (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/avdarinn").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const tr: string[] = [];
  if (options?.width) tr.push(`w-${options.width}`);
  if (options?.height) tr.push(`h-${options.height}`);
  if (options?.quality) tr.push(`q-${options.quality}`);
  if (options?.blur) tr.push(`bl-${options.blur}`);

  if (tr.length > 0) {
    return `${endpoint}/tr:${tr.join(",")}${cleanPath}`;
  }
  return `${endpoint}${cleanPath}`;
}
