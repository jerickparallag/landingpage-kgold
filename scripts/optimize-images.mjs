import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(fileURLToPath(import.meta.url), '..', '..');
const targets = [join(root, 'public'), join(root, 'src', 'assets', 'images')];
const inPlace = process.argv.includes('--in-place');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png']);

function getMaxWidth(filePath) {
  const normalized = filePath.replace(/\\/g, '/').toLowerCase();
  if (/product-|cover|logo|owner|jobs\//.test(normalized)) return 960;
  if (/coreval|career_job|career_intern/.test(normalized)) return 1200;
  return 1920;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function writeFileSafe(filePath, buffer) {
  await writeFile(filePath, buffer);
}

async function optimizeFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const maxWidth = getMaxWidth(filePath);
  const metadata = await sharp(filePath, { failOn: 'none' }).metadata();
  const sourceStats = await stat(filePath);

  const pipeline = sharp(filePath, { failOn: 'none' })
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: 'inside',
    });

  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');

  try {
    const webpStats = await stat(webpPath);
    if (webpStats.mtimeMs >= sourceStats.mtimeMs) {
      return null;
    }
  } catch {
    // WebP does not exist yet — generate it.
  }

  const webp = await pipeline.webp({ quality: 80 }).toBuffer();
  await writeFileSafe(webpPath, webp);

  let after = metadata.size ?? 0;

  if (inPlace) {
    let optimized;
    const resized = sharp(filePath, { failOn: 'none' })
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true, fit: 'inside' });

    if (ext === '.png') {
      optimized = await resized
        .png({ quality: 82, compressionLevel: 9, palette: metadata.hasAlpha })
        .toBuffer();
    } else {
      optimized = await resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }

    await writeFileSafe(filePath, optimized);
    after = optimized.length;
  }

  return {
    path: relative(root, filePath),
    before: metadata.size ?? 0,
    after,
    webp: webp.length,
    inPlace,
  };
}

async function main() {
  const files = [];
  for (const target of targets) {
    files.push(...(await walk(target)));
  }

  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  let totalBefore = 0;
  let totalWebp = 0;
  let processed = 0;

  for (const filePath of files) {
    const result = await optimizeFile(filePath);
    if (!result) continue;
    processed += 1;
    totalBefore += result.before;
    totalWebp += result.webp;
    console.log(
      `${result.path} → webp ${formatKb(result.webp)}${result.inPlace ? `, source ${formatKb(result.after)}` : ''}`,
    );
  }

  console.log(
    `\nGenerated WebP for ${processed}/${files.length} images (${formatMb(totalWebp)} total webp from ${formatMb(totalBefore)} sources).`,
  );

  if (!inPlace) {
    console.log('Tip: run `npm run optimize:images -- --in-place` to also compress originals (may fail on OneDrive).');
  }
}

function formatKb(bytes) {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
