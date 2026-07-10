import fs from 'fs';
import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const pages = {
  'homepage-hero': resolve(__dirname, 'src/pages/homepage-hero/index.html'),
};

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: pages,
      output: {
        entryFileNames: (chunkInfo) => {
          const pageName = Object.keys(pages).find(key =>
            chunkInfo.name === key || chunkInfo.facadeModuleId?.includes(`/${key}.html`)
          );
          const prefix = pageName ? `${pageName}/` : '';
          return `${prefix}assets/[name]-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          const pageName = Object.keys(pages).find(key =>
            chunkInfo.facadeModuleId?.includes(`/${key}.html`)
          );
          const prefix = pageName ? `${pageName}/` : 'homepage-hero/';
          return `${prefix}assets/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const pageName = Object.keys(pages).find(key =>
            assetInfo.originalFileNames?.some((f: string) => f.includes(`/${key}.html`))
          );
          const prefix = pageName ? `${pageName}/` : '';
          return `${prefix}assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  plugins: [
    {
      name: 'move-html-output',
      writeBundle() {
        const dist = path.resolve(__dirname, 'dist');
        const oldPath = path.join(dist, 'src/pages/homepage-hero/index.html');
        const newDir = path.join(dist, 'homepage-hero');
        const newPath = path.join(newDir, 'index.html');

        if (fs.existsSync(oldPath)) {
          fs.mkdirSync(newDir, { recursive: true });
          fs.renameSync(oldPath, newPath);

          // Fix relative asset paths in the moved HTML
          let html = fs.readFileSync(newPath, 'utf-8');
          // Replace paths like ../../../homepage-hero/assets/ with ./assets/
          html = html.replace(/src="[^"]*\/homepage-hero\/assets\//g, 'src="./assets/');
          html = html.replace(/href="[^"]*\/homepage-hero\/assets\//g, 'href="./assets/');
          fs.writeFileSync(newPath, html);

          // Clean up empty directories
          let dir = path.dirname(oldPath);
          while (dir !== dist) {
            if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
              fs.rmdirSync(dir);
            }
            dir = path.dirname(dir);
          }
        }
      },
    },
  ],
});
