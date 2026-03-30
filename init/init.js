const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Question = require('../modles/Questions');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

function loadSeedData() {
  const dataFile = process.argv[2] || process.env.SEED_FILE;

  if (!dataFile) {
    throw new Error('Seed file path missing. Pass a JSON file path as an argument or set SEED_FILE.');
  }

  const resolvedPath = path.resolve(__dirname, dataFile);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Seed file not found: ${resolvedPath}`);
  }

  return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file before running the seed script.');
  }

  const data = loadSeedData();
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'autopaper' });
  await Question.insertMany(data);

  console.log(`${data.length} questions inserted successfully.`);
  await mongoose.disconnect();
}

main()
  .then(() => {
    console.log('Seed completed.');
  })
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  });
