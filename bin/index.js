#! /usr/bin/env node

const info = require('../package.json');
const program = require('commander');
const config = {
  directory: 'l10n',
  copyrightHolder: 'Catbee'
};

const init = require('../helpers/init');
const update = require('../helpers/update');
const extract = require('../helpers/extract');
const archive = require('../helpers/archive');
const po2json = require('../helpers/po2json');

program
  .version(info.version)
  .option('-d, --directory [dir]', 'Directory with translates [l10n]', config.directory)
  .option('-y, --young', 'Do not remove old translates', true)
  .option('-a, --archive-name [name]', 'Archive name')
  .option('-c, --copyright-holder [copyrightHolder]', 'Copyright holder');

program
  .command('init [locale]')
  .description('Init new locale')
  .action((locale) => {
    program.directory = program.directory || config.directory;
    init(program, locale);
  });


program
  .command('extract [dirs...]')
  .description('Extract new phrases to translate')
  .action((dirs) => {
    program.directory = program.directory || config.directory;
    program.copyrightHolder = program.copyrightHolder || config.copyrightHolder;
    extract(program, dirs);
  });
program
  .command('update')
  .description('Update po files with new extracted translate')
  .action(() => {
    program.directory = program.directory || config.directory;
    update(program);
  });

program
  .command('archive')
  .description('Archive updated .po files to archive')
  .option('-a, --archive', 'Archive name')
  .action(() => {
    program.directory = program.directory || config.directory;
    archive(program);
  });

program
  .command('prepare [dirs...]')
  .description('extract, update and archive commands with one shot')
  .action((dirs) => {
    program.directory = program.directory || config.directory;
    extract(program, dirs);
    update(program);
    archive(program);
  });

program
  .command('po2json')
  .description('Transform .po files to .json files for application')
  .action(() => {
    program.directory = program.directory || config.directory;
    po2json(program);
  });


program.parse(process.argv);
