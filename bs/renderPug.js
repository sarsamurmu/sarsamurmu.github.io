// @ts-check
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { watch } = require('chokidar');
const chalk = require('chalk');

const pug = require('pug');
const { minify } = require('html-minifier');
const args = process.argv.splice(2, process.argv.length - 2);

const rootDir = path.resolve(__dirname, '..');
const filePathsGlob = './src/**/*.pug';
const importPathsGlob = './src/**/_*.pug';
const shouldWatch = args.includes('-w');

/** @param {string} filePath */
const renderFile = (filePath) => {
  const outputPath = filePath
    .replace(/src([\\/])/, 'build$1')
    .replace(/\.pug$/g, '.html');

  const canonical = outputPath
    .replace(/\\/g, '/')
    .replace('/build/', '/')
    .replace(/\.html$/, '')
    .replace(/(\.[\\/])/g, 'https://sarsamurmu.github.io/')
    .replace(/\/index$/, '');

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  let compiled = pug.compileFile(filePath)({ canonical });
  if (!shouldWatch) {
    // TODO: OPEN IT
    // compiled = minify(compiled, {
    //   minifyJS: true,
    //   minifyCSS: true
    // });
  }

  fs.writeFileSync(outputPath, compiled);

  console.log(chalk.green(`Rendered ${filePath} to ${outputPath}\n`));
}

const renderAll = () => {
  glob.sync(filePathsGlob, {
    ignore: importPathsGlob,
    cwd: rootDir
  }).forEach(renderFile);
}

renderAll();

if (shouldWatch) {
  watch(filePathsGlob, {
    ignored: importPathsGlob,
    cwd: rootDir
  })
  .on('change', renderFile)
  .on('ready', () => console.log(chalk.magenta(`Watching Pug files for change\n`)));

  watch(importPathsGlob, {
    cwd: rootDir
  }).on('change', (filePath) => {
    console.log(chalk.blue(`Import changed ${filePath}\n`));
    renderAll();
  });
}
