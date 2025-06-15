import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

function getTables() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => row.name));
      }
    );
  });
}

function getColumns(tableName) {
  return new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function printTablesAndColumns() {
  try {
    const tables = await getTables();

    if (tables.length === 0) {
      console.log("⚠️ No se encontraron tablas en la base de datos.");
      return;
    }

    console.log("📦 Tablas en la base de datos:\n");

    for (const tableName of tables) {
      console.log(`🧾 Tabla: ${tableName}`);
      const columns = await getColumns(tableName);
      for (const col of columns) {
        console.log(` - ${col.name} (${col.type})`);
      }
      console.log(""); // Salto de línea entre tablas
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    db.close();
  }
}

printTablesAndColumns();
