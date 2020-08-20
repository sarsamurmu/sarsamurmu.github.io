// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const chalk = require('chalk');

const pug = require('pug');
const { minify: minifyHtml } = require('html-minifier');
const args = process.argv.splice(2, process.argv.length - 2);

const pugFilePath = './src/**/!(_)*.pug';
const pugImportsPath = './src/imports/**/*.pug';
const watchFiles = args.includes('-w');

const renderFile = (filePath) => {
  const outputPath = filePath
    .replace(/src[\\/]/, '')
    .replace(/\.pug/g, '.html');

  const canonical = outputPath
    .replace(/\\/g, '/')
    .replace(/\.html$/, '')
    .replace(/(\.[\\/])/g, 'https://sarsamurmu.github.io/')
    .replace(/\/index$/, '');

  if (!fs.existsSync(path.dirname(outputPath))) fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  let compiled = pug.compileFile(filePath)({ canonical });
  if (!watchFiles) compiled = minifyHtml(compiled, {
    minifyJS: true,
    minifyCSS: true
  });

  fs.writeFileSync(outputPath, compiled);

  console.log(chalk.green(`Rendered ${filePath} to ${outputPath}\n`));
}

if (watchFiles) {
  chokidar.watch(pugFilePath, {
    ignored: pugImportsPath
  }).on('change', renderFile).on('ready', () => console.log(chalk.magenta(`Watching Pug files for change\n`)));

  chokidar.watch(pugImportsPath).on('change', (filePath) => {
    console.log(chalk.blue(`Import changed ${filePath}\n`));

    glob.sync(pugFilePath, { ignore: pugImportsPath }).forEach(renderFile);
  })
} else {
  glob.sync(pugFilePath, { ignore: pugImportsPath }).forEach(renderFile);
}
