import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function saveContentPlugin(): Plugin {
  return {
    name: 'save-content-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-content', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.content && typeof data.content === 'object') {
                const contentPath = path.resolve(__dirname, 'src/data/siteContent.json');
                let currentContent: any = {};
                try {
                  if (fs.existsSync(contentPath)) {
                    currentContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
                  }
                } catch (e) {}
                const merged = { ...currentContent, ...data.content };
                fs.writeFileSync(contentPath, JSON.stringify(merged, null, 2), 'utf-8');
              }
              if (data.banners && Array.isArray(data.banners)) {
                fs.writeFileSync(
                  path.resolve(__dirname, 'src/data/banners.json'),
                  JSON.stringify(data.banners, null, 2),
                  'utf-8'
                );
              }
              if (data.branding) {
                fs.writeFileSync(
                  path.resolve(__dirname, 'src/data/branding.json'),
                  JSON.stringify(data.branding, null, 2),
                  'utf-8'
                );
                // Se o usuário subiu uma imagem de logo em base64, grava direto no public/servo-logo.png
                if (data.branding.logoImageUrl && data.branding.logoImageUrl.startsWith('data:image/')) {
                  try {
                    const matches = data.branding.logoImageUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                    if (matches && matches[2]) {
                      const buffer = Buffer.from(matches[2], 'base64');
                      fs.writeFileSync(path.resolve(__dirname, 'public/servo-logo.png'), buffer);
                      fs.writeFileSync(path.resolve(__dirname, 'public/6.png'), buffer);
                    }
                  } catch (imgErr) {
                    console.error('Erro ao salvar buffer do logo:', imgErr);
                  }
                }
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Dados salvos diretamente no código fonte!' }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), saveContentPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
