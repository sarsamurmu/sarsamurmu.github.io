// @ts-check
const fs = require('fs');
const path = require('path');
const { watch } = require('chokidar');
const browserSync = require('browser-sync');

browserSync.init({
  server: {
    baseDir: path.join(__dirname, '../build'),
    serveStaticOptions: {
      extensions: ['html']
    }
  },
  middleware: [
    (req, res, next) => {
      if (
        /\/(scripts|resources)/.test(req.url)
      ) {
        const absoluteFilePath = path.join(__dirname, '../src/', req.url);
        if (fs.existsSync(absoluteFilePath)) {
          fs.createReadStream(absoluteFilePath).pipe(res);
          return;
        }
      }
      next();
    }
  ],
  // @ts-expect-error
  callbacks: {
    ready: (_, bs) => {
      bs.addMiddleware('*', (_, res) => {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });
        res.write(fs.readFileSync(path.join(__dirname, '../build/404.html')));
        res.end();
      });
    }
  }
});

watch([
  './build/**/*',
  './src/{scripts,resources}/**/*'
], {
  cwd: path.resolve(__dirname, '..')
})
.on('change', (file) => browserSync.reload(file));
