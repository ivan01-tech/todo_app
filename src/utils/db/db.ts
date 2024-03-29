import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import {Table} from '../../types/table.typing';

enablePromise(true);
export const DB_NAME = 'TODO_RN_DB';

export const connectToDatabase = async () => {
  return openDatabase(
    {name: DB_NAME, location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
 

  const todosQuery = `
   CREATE TABLE IF NOT EXISTS Todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      color TEXT,
      time TEXT,
      completed INTEGER NOT NULL
   )
  `;
  try {
    // await db.executeSql(userPreferencesQuery);
    await db.executeSql(todosQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = [];
    const results = await db.executeSql(
      `SELECT name FROM ${DB_NAME} WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get table names from database');
  }
};

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

export function alteredTable(db: SQLiteDatabase) {
  const alterTableQuery = `
  ALTER TABLE Todos
  ADD COLUMN completed INTEGER NOT NULL DEFAULT 0;
`;

  try {
    db.transaction(tx => {
      tx.executeSql(alterTableQuery, [], (tx, result) => {
        console.log('Table altered successfully:', result);
      });
    });
  } catch (error) {
    console.error('Error altering table:', error);
  }
}
