const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 200;
/**
 * Function to resize image
 * @param {Number} imagewidth
 * @param {Number} imageheight
 * @param {Number} thumbwidth
 * @param {Number} thumbheight
 */
function resize (imagewidth, imageheight, thumbwidth, thumbheight) {
  let w = 0;
  let h = 0;
  let x = 0;
  let y = 0;
  let widthratio = imagewidth / thumbwidth;
  let heightratio = imageheight / thumbheight;
  let maxratio = Math.max(widthratio, heightratio);
  if (maxratio > 1) {
    w = imagewidth / maxratio;
    h = imageheight / maxratio;
  } else {
    w = imagewidth;
    h = imageheight;
  }
  x = (thumbwidth - w) / 2;
  y = (thumbheight - h) / 2;
  return {
    w: w,
    h: h,
    x: x,
    y: y
  };
}

/**
 * Function to read file
 * @param {File} file
 */
function readFile (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsDataURL(file);
  });
}

function createCanvas () {
  let canvas = document.createElement('canvas');
  canvas.width = THUMB_WIDTH;
  canvas.height = THUMB_HEIGHT;
  return canvas;
}

function createImg (data) {
  return new Promise((resolve, reject) => {
    let canvas = createCanvas();
    let contextCanvas = canvas.getContext('2d');
    let img = new Image();
    img.src = data;

    img.onerror = reject;
    img.onload = function () {
      var dimensions = resize(this.width, this.height, THUMB_WIDTH, THUMB_HEIGHT);
      contextCanvas.drawImage(
        this, dimensions.x, dimensions.y, dimensions.w, dimensions.h
      );
      resolve(canvas.toDataURL());
    };
  });
}

async function createThumbnail (file) {
  let data = await readFile(file);
  let thumbnail = await createImg(data);
  return thumbnail;
}

/**
 * Function to generate Thumbnail of an image
 * @param {HTMLElemment} inputFile
 */
function generateThumbnails (inputFile) {
  let thumbnailsPromises = [];
  Array.from(inputFile.files).forEach((file) => {
    let promise = new Promise((resolve, reject) => {
      if (file.type.indexOf('image') === -1) {
        resolve(null);
      } else {
        createThumbnail(file)
          .then((img) => {
            resolve(img);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
    thumbnailsPromises.push(promise);
  });
  return Promise.all(thumbnailsPromises);
}

module.exports = generateThumbnails;
