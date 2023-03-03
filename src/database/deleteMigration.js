import fs from 'fs';
import { migrationListPath } from '../utils/constants/migratons.js';

const deleteMigration = async () => {
  const data = await fs.promises.readFile(migrationListPath, 'utf-8');
  const migrationsList = data.trim().split('\n');
  migrationsList.pop();

  const migrationName = process.argv[2];

  await fs.promises.writeFile(migrationListPath, migrationsList.join('\n') + '\n', 'utf-8');
  await fs.promises.unlink(`./src/migrations/${migrationName}.js`);
};

await deleteMigration();
