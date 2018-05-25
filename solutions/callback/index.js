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
 * @param {Function} errorCallback 
 */
function saveFile (basePath, fileName, image, errorCallback) {
  const dir = basePath + '/thumbanails/';
  const nameFile = 'thumbnail.' + fileName;

  image.write(dir + nameFile, (err) => {
    if (err) {
      return errorCallback(err);
    }
    console.log('Fichero creado: ' + nameFile);
  });
}

/**
 * Function to resize image
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Buffer} data 
 * @param {Function} successCalback 
 * @param {Function} errorCallback 
 */
function resizeImg (basePath, fileName, data, successCalback, errorCallback) {
  function succesResize (err, image) {
    if (err) {
      return errorCallback(err);
    }
    saveFile(basePath, fileName, image)
  }

  jimp.read(data, function(err, image){
    if (err) {
      return errorCallback(err);
    }
    image.resize(THUMB_WIDTH, THUMB_HEIGHT, succesResize);
  });
}

/**
 * Function to generate Thumbnail of an image
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Buffer} data 
 * @param {Function} errorCallback 
 */
function generateThumbnails (basePath, fileName, data, errorCallback) {
  resizeImg(basePath, fileName, data, saveFile, errorCallback);
}

/**
 * Function to read file
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Function} successCallback 
 * @param {Function} errorCallback 
 */
function readFile (basePath, fileName, successCallback, errorCallback) {
  fs.readFile(basePath + '/' + fileName, function (err,data) {
    if (err) {
      return errorCallback(err);
    }
    console.log('File read:' + fileName);
    successCallback(basePath, fileName, data, errorCallback);
  });
}

/**
 * Function to get paths of a directory
 * @param {String} basePath 
 * @param {Function} successCallback 
 * @param {Function} errorCallback 
 */
function readDir (basePath, successCallback, errorCallback) {
  const ALLOW_EXT = ['.png', '.jpeg', '.gif'];
  fs.readdir(basePath, (err, files) => {
    if (err) {
      return errorCallback(err);
    }
    files.forEach(fileName => {
      console.log('File found:' + fileName);
      if (ALLOW_EXT.includes(path.extname(fileName))){
        readFile(basePath, fileName, successCallback, errorCallback);
      }      
    });
  })
}

function showError(err) {
  console.log(err)
}

function processFiles(directory, action) {
  readDir(directory, action, showError);
}

function init () {
  let dir = path.resolve(process.cwd(), __dirname).replace('/solutions/callback', '') + '/img';
  processFiles(dir, generateThumbnails);
}

init();
