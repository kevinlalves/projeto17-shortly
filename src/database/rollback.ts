import fs from 'fs';
import { ErrnoException } from '../types/utils/errors.js';
import { lastMigrationPath, migrationListPath } from '../utils/constants/migrations.js';

const rollback = async () => {
  let data: string = await fs.promises.readFile(migrationListPath, 'utf-8');
  const migrationsList: string[] = data.trim().split('\n');

  try {
    data = await fs.promises.readFile(lastMigrationPath, 'utf-8');
  } catch (error) {
    if ((error as ErrnoException).code === 'ENOENT') {
      await fs.promises.writeFile(lastMigrationPath, '-1', 'utf-8');

      console.log('no migration to rollback');
      return;
    } else {
      throw error;
    }
  }
  const lastMigration = Number(data);

  if (lastMigration < 0) return;

  try {
    const { down } = await import(`../migrations/${migrationsList[lastMigration]}.js`);
    const error: ErrnoException = await down();
    if (error) {
      throw error;
    }

    await fs.promises.writeFile(lastMigrationPath, `${lastMigration - 1}`, 'utf-8');
    console.log(`rolled back ${migrationsList[lastMigration]} successfully!`);
  } catch (error) {
    console.log(`error running rollback ${migrationsList[lastMigration]}`);
    console.log(error);
  }

  if (process.env.NODE_ENV === 'development') process.exit();
};

rollback();
