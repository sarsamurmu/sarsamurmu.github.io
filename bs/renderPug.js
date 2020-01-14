const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const chalk = require('chalk');

const pug = require('pug');
const minifyHtml = require('html-minifier').minify;
const args = process.argv.splice(2, process.argv.length - 2);

const pugFilePath = './src/**/!(_)*.pug';
const pugImportsPath = './src/imports/**/*.pug';

const renderFile = (filePath) => {
  const outputPath = filePath.replace(/src(\\|\/)/, '').replace('.pug', '.html');

  const canonical = filePath.replace(/(\.\/)?public/g, 'https://sarsamurmu.github.io').replace(/\\/g, '/').replace(/(\.html|\/index)/g, '');

  if (!fs.existsSync(path.dirname(outputPath))) fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, minifyHtml(pug.compileFile(filePath)({ canonical }), {
    minifyJS: true,
    minifyCSS: true
  }));

  console.log(chalk.green(`Rendered ${filePath} to ${outputPath}\n`));
}

if (args.includes('-w')) {
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
