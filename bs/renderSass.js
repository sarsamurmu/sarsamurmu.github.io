const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const chalk = require('chalk');

const sass = require('node-sass');
const args = process.argv.splice(2, process.argv.length - 2);

const sassPath = `./src/stylesheets/*.scss`;
const sassImportPath = './src/stylesheets/imports/';
const watchFiles = args.includes('-w');

const renderFile = (filePath, retry) => {
  const outputPath = path.join('stylesheets', path.basename(filePath).replace('.scss', '.css'));

  try {
    const result = sass.renderSync({
      file: filePath,
      outputStyle: watchFiles ? 'expanded' : 'compressed',
      sourceMap: watchFiles
    });

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true
    });

    fs.writeFileSync(outputPath, result.css.toString());

    console.log(chalk.green(`Rendered ${filePath} to ${outputPath}\n`));
  } catch (err) {
    if (retry && err.message.includes('unreadable')) {
      return setTimeout(() => renderFile(filePath), 200);
    }
    console.log(chalk.red(err.formatted));
  }
}

if (watchFiles) {
  chokidar.watch(sassPath).on('change', (filePath) => renderFile(filePath, true)).on('ready', () => console.log(chalk.magenta(`Watching Sass files for change\n`)));

  chokidar.watch(sassImportPath).on('change', (filePath) => {
    console.log(chalk.blue(`Import changed ${filePath}\n`));

    glob.sync(sassPath).forEach(renderFile);
  })
} else {
  glob.sync(sassPath).forEach(renderFile);
}
