const fs = require('fs');
const path = require('path');
const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 200;
const jimp = require('jimp');

function showError(err) {
  console.log(err)
}

function generateThumbnails () {
  
}

function processFiles(directory, action) {
  
}

function init () {
  let dir = path.resolve(process.cwd(), __dirname).replace('/problems/asyncAwait', '') + '/imgExercises';
  processFiles(dir, generateThumbnails);
}

init();
