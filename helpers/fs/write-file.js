'use strict';

let mkdirp = require('mkdirp');
let path = require('path');
let fs = require('fs');

function writeFile (filePath, content) {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(filePath), (err) => {
      if (err) {
        reject(err);
        return;
      }

      fs.writeFile(filePath, content, 'utf8', (er) => er ? reject(er) : resolve());
    });
  });
}

module.exports = writeFile;
