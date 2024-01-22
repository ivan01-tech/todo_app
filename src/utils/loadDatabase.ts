import {useCallback} from 'react';
import {connectToDatabase, createTables} from './db/db';
export const loadData = useCallback(async () => {
  try {
    const db = await connectToDatabase();
    await createTables(db);
    console.log('connected successfuly to the database', db.dbname);
    // const names = await getTableNames(db);
    // console.log('success1', names);
  } catch (error) {
    console.error(error);
  }
}, []);
