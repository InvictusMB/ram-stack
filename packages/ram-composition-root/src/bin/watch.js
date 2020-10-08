const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

module.exports = {watch};

function watch(cwd, filename) {
  const fileToUpdate =  path.join(cwd, filename);

  console.log(`Watching ${cwd} for new files.`);

  const watcher = chokidar.watch([
    path.join(cwd, '**/*.tsx'),
    path.join(cwd, '**/*.ts'),
    path.join(cwd, '**/*.js'),
    path.join(cwd, '**/*.jsx'),
  ], {
    ignored: fileToUpdate,
    persistent: true,
  });

  watcher.on('ready', () => {
    watcher
      .on('add', path => {
        console.log(`File ${path} has been added`);
        return invalidateCache(fileToUpdate);
      })
      .on('unlink', path => {
        console.log(`File ${path} has been removed`);
        return invalidateCache(fileToUpdate);
      });
  });
}

function invalidateCache(fileName) {
  console.log(`Updating ${fileName}`)
  fs.utimesSync(fileName, new Date(), new Date());
}
