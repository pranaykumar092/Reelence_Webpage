import fs from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function kidsWorldManifestPlugin() {
  async function generateManifest() {
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
    } catch (error) {
      console.warn('[kids-world-manifest] Unable to generate manifest:', error);
    }
  }

  return {
    name: 'kids-world-manifest',
    async buildStart() {
      await generateManifest();
    },
    async configureServer(server) {
      await generateManifest();

      const kidsDir = path.resolve(process.cwd(), 'public', 'kids-world');
      server.watcher.add(kidsDir);

      const refreshManifest = async (filePath) => {
        if (!filePath) return;
        if (!filePath.startsWith(kidsDir)) return;
        await generateManifest();
      };

      server.watcher.on('add', refreshManifest);
      server.watcher.on('unlink', refreshManifest);
      server.watcher.on('change', refreshManifest);
    },
  };
}

export default defineConfig({
  plugins: [react(), kidsWorldManifestPlugin()],
  server: {
    allowedHosts: ['eb5f-2409-40d2-28-5574-ec5c-bba3-d383-f222.ngrok-free.app'],
  },
});
