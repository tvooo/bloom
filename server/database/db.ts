import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('/Users/tim/Nextcloud/bloom/bloom-imported.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    console.log('error opening db', err)
  });

  export default db;