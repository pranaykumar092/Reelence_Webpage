import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set Turbopack root explicitly to avoid lockfile-ambiguity warning
  // (this project is nested inside a parent Vite workspace)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
