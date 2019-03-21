const fs = require('fs');
const path = require('path');
const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 200;
const jimp = require('jimp');

/**
 * Function to save write img
 * @param {String} basePath
 * @param {String} fileName
 * @param {Image} image
 */
function saveFile(basePath, fileName, image) {
  const dir = basePath + '/thumbanails/';
  const nameFile = 'thumbnail.' + fileName;
  return image.write(dir + nameFile, function() {
    console.log('Fichero creado: ' + nameFile);
  });
}

/**
 * Function to resize image
 * @param {String} basePath
 * @param {String} fileName
 * @param {Buffer} data
 */
function resizeImg(basePath, fileName, data) {
  return jimp.read(data).then(image => {
    return image.resize(THUMB_WIDTH, THUMB_HEIGHT);
  });
}

/**
 * Function to generate Thumbnail of an image
 * @param {String} basePath
 * @param {String} fileName
 * @param {Buffer} data
 */
function generateThumbnails(basePath, fileName, data) {
  return resizeImg(basePath, fileName, data).then(image => {
    saveFile(basePath, fileName, image);
  });
}

/**
 * Function to read file
 * @param {String} basePath
 * @param {String} fileName
 */
function readFile(basePath, fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(basePath + '/' + fileName, function(err, data) {
      if (err) {
        return reject(err);
      }
      console.log('File read:' + fileName);
      resolve(data);
    });
  });
}

/**
 * Function to get paths of a directory
 * @param {String} basePath
 */
function readDir(basePath) {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
}

function showError(err) {
  console.log('*** Se ha producido un error: ' + err);
}

function processFiles(directory, action) {
  const ALLOW_EXT = ['.png', '.jpeg', '.jpg', '.gif'];

  return readDir(directory, action)
    .then(files => {
      files.forEach(fileName => {
        if (ALLOW_EXT.includes(path.extname(fileName))) {
          console.log('File found:' + fileName);

          readFile(directory, fileName).then(dataFile => {
            action(directory, fileName, dataFile).catch(showError);
          });
        }
      });
    })
    .catch(showError);
}

function init() {
  let dir =
    path.resolve(process.cwd(), __dirname).replace('/solutions/promises', '') +
    '/imgExercises';
  processFiles(dir, generateThumbnails);
}
init();
