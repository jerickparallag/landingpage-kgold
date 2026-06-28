/** Derive a sibling WebP URL for public or bundled raster assets. */
export function getWebpSrc(src: string): string | null {
  if (!/\.(jpe?g|png)(?:[?#].*)?$/i.test(src)) return null;
  return src.replace(/\.(jpe?g|png)(?=([?#].*)?$)/i, '.webp');
}

/** CSS background-image with WebP preferred via image-set. */
export function getParallaxBackgroundImage(src: string): string {
  const webpSrc = getWebpSrc(src);
  if (!webpSrc) return `url("${src}")`;
  const mime = /\.png(?:[?#].*)?$/i.test(src) ? 'image/png' : 'image/jpeg';
  return `image-set(url("${webpSrc}") type("image/webp"), url("${src}") type("${mime}"))`;
}
