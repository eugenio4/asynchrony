const fs = require('fs');
const path = require('path');
const os = require('os');
const { fork } = require('child_process');
const numberOfCores = os.cpus().length;
let listOfOProcessFree = [];
let files;
let directory;

async function init () {
  try {
    directory = path.resolve(process.cwd(), __dirname).replace('/problems/generators', '') + '/imgExercises';

    
  } catch (error) {
    throw error; 
  }  
}

init()  
  .catch(console.log)