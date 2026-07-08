import fs from 'node:fs/promises';
import path from 'node:path';

// Scans public/kids-world for video files and writes manifest.json, replacing
// the Vite kidsWorldManifestPlugin. The client fetches /kids-world/manifest.json
// at runtime, so this must run before `next dev` and `next build` (wired via the
// predev / prebuild npm scripts).
const kidsDir = path.resolve(process.cwd(), 'public', 'kids-world');
const manifestPath = path.join(kidsDir, 'manifest.json');

try {
  await fs.mkdir(kidsDir, { recursive: true });
  const entries = await fs.readdir(kidsDir, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => /\.(mp4|webm|mov)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  await fs.writeFile(manifestPath, `${JSON.stringify(files, null, 2)}\n`, 'utf8');
  console.log(`[kids-world-manifest] wrote ${files.length} entr${files.length === 1 ? 'y' : 'ies'}`);
} catch (error) {
  console.warn('[kids-world-manifest] Unable to generate manifest:', error);
}
