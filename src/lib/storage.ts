import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'assignmento-db';
const STORE_NAME = 'config';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
  }
  return dbPromise;
}

export async function getConfig(key: string, defaultValue: string): Promise<string> {
  const db = await getDB();
  const val = await db.get(STORE_NAME, key);
  return val ?? defaultValue;
}

export async function setConfig(key: string, value: string): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, value, key);
}

export async function getAllConfig(): Promise<Record<string, string>> {
  const db = await getDB();
  const keys = await db.getAllKeys(STORE_NAME);
  const values = await db.getAll(STORE_NAME);
  const config: Record<string, string> = {};
  keys.forEach((key, i) => {
    config[key.toString()] = values[i];
  });
  return config;
}
