const fs = require('fs');
const path = require('path');
const os = require('os');
const { fork } = require('child_process');
const numberOfCores = os.cpus().length;
let listOfOProcessFree = [];
let files;
let directory;

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

function* gen() {
  while(true) {
    var value = yield null;
    console.log(value);
  }
}

function *generateThumbnails() {
  for (let i = 0; i < files.length; i++) {
    const ALLOW_EXT = ['.png', '.jpeg', '.jpg', '.gif'];    
    if (ALLOW_EXT.includes(path.extname(files[i]))){
      let processChild = getProcessChild();
      yield processChild.send({
        path: directory,
        fileName: files[i]
      });
    }
  }
  for (let i = 0; i < numberOfCores; i++) {
    yield getProcessChild().kill();
  }  
}

function getProcessChild () {
  return listOfOProcessFree.pop();
}

async function init () {
  try {
    directory = path.resolve(process.cwd(), __dirname).replace('/solutions/generators', '') + '/imgExercises';

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

init()  
  .catch(console.log)