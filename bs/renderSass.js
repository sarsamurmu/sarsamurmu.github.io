// @ts-check
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { watch } = require('chokidar');
const chalk = require('chalk');

const sass = require('node-sass');
const args = process.argv.splice(2, process.argv.length - 2);

const rootDir = path.resolve(__dirname, '..');
const filePathsGlob = './src/stylesheets/*.scss';
const importPathsGlob = './src/stylesheets/imports/';
const shouldWatch = args.includes('-w');
const line = '-'.repeat(process.stdout.columns);

/**
 * @param {string} filePath
 * @param {boolean} [retry]
 */
const renderFile = (filePath, retry) => {
  const outputPath = filePath
    .replace(/src([\\/])/, 'build$1')
    .replace(/\.scss$/, '.css');

  try {
    const result = sass.renderSync({
      file: filePath,
      outputStyle: shouldWatch ? 'expanded' : 'compressed',
      sourceMap: shouldWatch
    });

    fs.mkdirSync(path.dirname(outputPath), {
      recursive: true
    });

    fs.writeFileSync(outputPath, result.css.toString());

    console.log(chalk`{green Rendered file: {cyan "${filePath}" -> "${outputPath}"}}`);
  } catch (e) {
    if (retry && e.message.includes('unreadable')) {
      return setTimeout(() => renderFile(filePath), 200);
    }
    console.log(chalk.red(`${line}\n${e.formatted}\n${line}`));
  }
}

const renderAll = () => {
  glob.sync(filePathsGlob, {
    cwd: rootDir
  }).forEach((file) => renderFile(file));
}

renderAll();

if (shouldWatch) {
  watch(filePathsGlob, {
    cwd: rootDir
  })
  .on('change', (filePath) => renderFile(filePath, true))
  .on('ready', () => console.log(chalk.magenta(`Watching Sass files for change`)));

  watch(importPathsGlob, {
    cwd: rootDir
  }).on('change', (filePath) => {
    console.log(chalk.blue(`Import changed ${filePath}`));
    renderAll();
  });
}
