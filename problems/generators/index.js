const fs = require('fs');
const path = require('path');
const os = require('os');
const {fork} = require('child_process');
const numberOfCores = os.cpus().length;
let listOfOProcessFree = [];

let directory;

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

function* generateThumbnails() {
  /**Construye la funcion generadora, puedes apoyarte en tantas funciones auxiliares como necesites */
}

async function init() {
  try {
    directory =
      path
        .resolve(process.cwd(), __dirname)
        .replace('/problems/generators', '') + '/imgExercises';

    files = await readDir(directory);
    let generate = generateThumbnails();

    for (var i = 0; i < numberOfCores; i++) {
      const forked = fork(__dirname + '/thumbnail.js');
      forked.on('message', () => {
        listOfOProcessFree.push(forked);
        generate.next();
      });

      listOfOProcessFree.push(forked);
      generate.next();
    }
  } catch (error) {
    throw error;
  }
}

init().catch(console.log);
