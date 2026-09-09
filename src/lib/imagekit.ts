import ImageKit from "imagekit";

const DEFAULT_PUBLIC_KEY = "public_uzSklsoDFlGNoIPGFtTdcYJU32Y=";
const DEFAULT_PRIVATE_KEY = "private_Zgjm0jSmxe2S76y3kkULZ5nzEvo=";
const DEFAULT_URL_ENDPOINT = "https://ik.imagekit.io/avdarinn";

let imagekitInstance: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!imagekitInstance) {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || DEFAULT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || DEFAULT_PRIVATE_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || DEFAULT_URL_ENDPOINT;

    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
  return imagekitInstance;
}

/**
 * Returns client-side authentication parameters required by ImageKit front-end SDKs
 */
export function getImageKitAuthParams() {
  const ik = getImageKit();
  return ik.getAuthenticationParameters();
}

/**
 * Helper to build optimized ImageKit URLs with dynamic transformation
 */
export function buildImageUrl(path: string, options?: { width?: number; height?: number; quality?: number; blur?: number }): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const endpoint = (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || DEFAULT_URL_ENDPOINT).replace(/\/$/, "");
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

export default getImageKit;
