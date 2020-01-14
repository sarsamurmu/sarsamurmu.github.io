const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const browserSync = require('browser-sync');

browserSync.init({
  server: {
    baseDir: '.',
    serveStaticOptions: {
      extensions: ['html']
    }
  },
  callbacks: {
    ready: (err, bs) => {
      bs.addMiddleware('*', (req, res) => {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.write(fs.readFileSync('404.html'));
        res.end()
      })
    }
  }
});

browserSync.watch('.').on('change', (filePath) => {
  const extname = path.extname(filePath).replace('.', '');
  if (['css', 'js', 'html'].includes(extname)) browserSync.reload(extname);
});
