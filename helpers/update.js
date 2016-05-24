const shell = require('shelljs');
const path = require('path');

module.exports = (program) => {
  shell.exec(`mkdir -p ${program.directory}`);

  shell.exec(`python2.7 ${path.join(__dirname, 'extractors/run_babel.py')} update \
--width=160 \
--no-fuzzy-matching \
--input-file ./${program.directory}/messages.pot \
--output-dir ./${program.directory}`);

  if (program.alwaysYoung) {
    shell.exec(`find ./${program.directory} -name 'messages.po' | xargs sed -i '' 's/#~ //g'`);
  }
};
