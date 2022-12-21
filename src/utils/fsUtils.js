const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

async function readFileTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

const generateToken = () => crypto.randomBytes(8).toString('hex');

readFileTalkers();

module.exports = {
  readFileTalkers,
  generateToken,
};