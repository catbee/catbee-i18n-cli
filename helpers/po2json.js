var po2json = require('po2json');
var getFiles = require('./fs/get-files');
var readFile = require('./fs/read-file');
var writeFile = require('./fs/write-file');
var path = require('path');
var _ = require('lodash');

/**
 * Скрипт конвертации .po файлов c переводами в .json посредством po2json модуля.
 *
 * Должен запускаться при деплое приложения через npm run i18n.po2json
 * @param {Object} program
 */
module.exports = (program) => {
  var files = getFiles(path.join(process.cwd(), `${program.directory}/**/*.po`));

  _.each(files, handleFile);
};

function handleFile (filePath) {
  return readFile(filePath)
    .then(convert)
    .then(pickPlural)
    .then(_.partial(toJSON, filePath))
    .then(handleJSON)
    .then(onSuccess)
    .catch(processExit);

  function onSuccess () {
    successHandler(filePath);
  }
}

function handleJSON (json) {
  return writeFile(json.filePath, json.content);
}

/**
 * Получившийся объект с переводами в строку и в .json файл.
 *
 * @param {string} filePath
 * @param {Object} json
 * @returns {{filePath, content}}
 */
function toJSON (filePath, json) {
  var jsonName = path.basename(filePath, '.po') + '.json';
  var dir = path.dirname(filePath);
  var jsonPath = path.join(dir, jsonName);

  return {
    filePath: jsonPath,
    content: JSON.stringify(json)
  };
}

/**
 * @param {Buffer} content - содержимое .po файла.
 * @returns {Object}
 */
function convert (content) {
  var options = {
    pretty: false,
    fuzzy: false,
    stringify: false,
    commonJs: true,
    format: 'raw',
    ext: '.js',
    debug: false
  };

  return po2json.parse(content.toString(), options);
}

/**
 * Из po файла для работы переводов нужена только plural формула.
 * Остальную тех инфу опускаем.
 *
 * @param {Object} json
 * @returns {Object}
 */
function pickPlural (json) {
  json[''] = _.chain(json)
    .get('')
    .pick('plural-forms')
    .value();

  return json;
}

/**
 * Сообщаем в консоли об обработанных файлах.
 *
 * @param {string} filePath
 */
function successHandler (filePath) {
  console.log(filePath, 'is written'); // eslint-disable-line no-console
}

function processExit (e) {
  console.error(e); // eslint-disable-line no-console
  process.exit(1);
}
