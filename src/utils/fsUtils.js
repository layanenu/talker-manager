const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const FILE_TALKERS_PATH = '../talker.json';

async function readFileTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, FILE_TALKERS_PATH));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

const generateToken = () => crypto.randomBytes(8).toString('hex');

async function writeFileTalkers(newTalker) {
  try {
    const oldTalkers = await readFileTalkers();
    const allTalkers = [...oldTalkers, newTalker];
    
    // console.log(newTalker);
    await fs.writeFile(path.resolve(__dirname, FILE_TALKERS_PATH), JSON.stringify(allTalkers));
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function writeFileTalkersArray(newTalkers) {
  try {
    await fs.writeFile(path.resolve(__dirname, FILE_TALKERS_PATH), JSON.stringify(newTalkers));
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

module.exports = {
  readFileTalkers,
  generateToken,
  writeFileTalkers,
  writeFileTalkersArray,
};