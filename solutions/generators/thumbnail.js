const fs = require('fs');
const path = require('path');
const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 200;
const jimp = require('jimp');
const os = require('os');

const numberOfCores = os.cpus().length;

/**
 * Function to save write img
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Image} image
 */
function saveFile (basePath, fileName, image) {
  const dir = basePath + '/thumbanails/';
  const nameFile = 'thumbnail.' + fileName;
  return image.write(dir + nameFile, function () {
    console.log('Fichero creado: ' + nameFile)
  });
}

/**
 * Function to resize image
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Buffer} data
 */
async function resizeImg (basePath, fileName, data) {
  let image = await jimp.read(data);
  return image.resize(THUMB_WIDTH, THUMB_HEIGHT);
}

/**
 * Function to generate Thumbnail of an image
 * @param {String} basePath 
 * @param {String} fileName 
 * @param {Buffer} data 
 */
async function generateThumbnails (basePath, fileName, data) {
  let image = await resizeImg(basePath, fileName, data);
  return saveFile(basePath, fileName, image);
}

/**
 * Function to read file
 * @param {String} basePath 
 * @param {String} fileName
 */
function readFile (basePath, fileName) {
  return new Promise ((resolve, reject) => {
    fs.readFile(basePath + '/' + fileName, function (err,data) {
      if (err) {
        return reject(err);
      }
      console.log('File read:' + fileName);
      resolve(data);
    });
  });  
}

process.on('message', async (msg) => {
  try {
    let dataFile = await readFile(msg.path, msg.fileName);
    await generateThumbnails(msg.path, msg.fileName, dataFile);
    process.send('finish'); 
  } catch (error) {
    console.log(error);
  }  
});

module.export