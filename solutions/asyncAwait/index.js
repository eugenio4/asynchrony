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

/**
 * Function to get paths of a directory
 * @param {String} basePath 
 */
function readDir (basePath) {
  return new Promise ((resolve, reject) => {
    fs.readdir(basePath, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);      
    })
  });  
}

function showError(err) {
  console.log('*** Se ha producido un error: ' + err);
}

async function processFiles(directory, action) {
  const ALLOW_EXT = ['.png', '.jpeg', '.jpg', '.gif'];
  try {
    let files =  await readDir(directory, action);  
    for (let file of files) {
      if (ALLOW_EXT.includes(path.extname(file))){

        console.log('File found:' + file);

        let dataFile = await readFile(directory, file);
        action(directory, file, dataFile);            
      }
    };
    return true;
  } catch (err) {
    showError(err);
  }
}

function init () {
  let dir = path.resolve(process.cwd(), __dirname).replace('/solutions/asyncAwait', '') + '/imgExercises';
  processFiles(dir, generateThumbnails);
}

init();
