const shell = require('shelljs');
const path = require('path');

module.exports = (program, dirs) => {
  shell.exec(`mkdir -p ${program.directory}`);

  shell.exec(`python2.7 ${path.join(__dirname, 'extractors/run_babel.py')} extract \
--msgid-bugs-address=lkrteam@2gis.ru \
--copyright-holder="${program.copyrightHolder}" \
--keyword=_t:1 --keyword=_nt:1,3 --keyword=_pt:1c,2 --keyword=_npt:1c,2,4 \
--add-comments=";" \
--width=160 \
--mapping=${path.join(__dirname, 'extractors/babel.cfg')} \
--no-default-keywords \
--strip-comment-tags \
--no-location \
-o ${path.resolve(process.cwd(), program.directory, 'messages.pot')} \
${(dirs || []).join(' ')}`);
};

