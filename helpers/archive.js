var archiver = require('archiver');
var getFiles = require('./fs/get-files');
var readFile = require('./fs/read-file');
var git = require('git-rev-sync');
var path = require('path');
var fs = require('fs');

/**
 * Скрипт архивирования .po файлов для отправки переводчикам.
 */

module.exports = (program) => {
  var files = getFiles(path.join(process.cwd(), `${program.directory}/**/*.po`));

  var archive = archiver.create('zip');
  var baseName = 'po';
  var gitBranch = git.branch();
  var archiveName = [baseName, gitBranch, 'zip'].join('.');

  var zipPath = path.join(process.cwd(), archiveName);

  archive.pipe(fs.createWriteStream(zipPath));

  var promises = files.map((filePath) => {
    var locale = /l10n\/([A-Za-z_]*)\/LC_MESSAGES/g.exec(filePath)[1];

    return readFile(filePath)
      .then((content) => archive.append(content, {
        name: `${baseName}.${gitBranch}/${locale}.${gitBranch}.po`
      }))
      .then(() => appendHandler(filePath));
  });

  Promise.all(promises)
    .then(() => archive.finalize())
    .then(finalizeHandler)
    .catch(errorHandler);

  function appendHandler (filePath) {
    console.log(`${filePath} appended to archive`); // eslint-disable-line no-console
  }

  function finalizeHandler () {
    console.log(`${archiveName} is ready`); // eslint-disable-line no-console
  }

  function errorHandler (e) {
    console.log('archiving fails'); // eslint-disable-line no-console
    console.error(e); // eslint-disable-line no-console
  }
};

