// @ts-check
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

glob.sync('./src/{scripts,resources}/**/*', {
  cwd: path.resolve(__dirname, '..')
}).forEach((filePath) => {
  const outputPath = filePath.replace(/src([\\/])/, 'build$1');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.copyFileSync(filePath, outputPath);

  console.log(chalk`{green Copied: {cyan "${filePath}" -> "${outputPath}"}}`)
});
