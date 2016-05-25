const shell = require('shelljs');
const path = require('path');

module.exports = (program, locale) => {
  shell.exec(`mkdir -p ${program.directory}`);

  shell.exec(`python2.7 ${path.join(__dirname, 'extractors/run_babel.py')} init \
--locale=${locale} \
--input-file=./${program.directory}/messages.pot \
--output-dir=./${program.directory}`);
};

