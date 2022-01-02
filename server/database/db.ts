import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(process.env.BLOOM_DB || 'bloom.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    console.log('error opening db', err)
  });

  export default db;