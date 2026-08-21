/** Extract a Google Drive file id from common share / view URLs. */
export function extractDriveFileId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  const patterns = [
    /\/file\/d\/([^/?#]+)/i,
    /[?&]id=([^&]+)/i,
    /\/uc\?.*[?&]id=([^&]+)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

/** CORS-friendly direct download URL for public Drive files. */
export function driveDirectDownloadUrl(driveUrl: string): string | null {
  const fileId = extractDriveFileId(driveUrl);
  if (!fileId) {
    return null;
  }

  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
}

export function resolveMagazinePdfSource(driveUrl?: string, pdfUrl?: string): string | null {
  if (pdfUrl?.trim()) {
    return pdfUrl;
  }

  if (driveUrl?.trim()) {
    return driveDirectDownloadUrl(driveUrl);
  }

  return null;
}

export function resolveAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, document.baseURI).href;
}
