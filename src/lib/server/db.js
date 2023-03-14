import { resolve } from "path";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("db.db");

db.run(
  "CREATE TABLE IF NOT EXISTS users (email TEXT, password TEXT, username TEXT, uuid TEXT)"
);

db.run("CREATE TABLE IF NOT EXISTS lists (name TEXT, uuid TEXT)");

db.run(
  "CREATE TABLE IF NOT EXISTS listEntries(txt TEXT, uuid TEXT, user TEXT, list TEXT)"
);

export async function newList(name) {
  console.log("LIST NAME", name);
  db.run("INSERT INTO lists(name, uuid) VALUES(?, ?)", [
    name,
    crypto.randomUUID(),
  ]);
}

export async function getLists() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM lists", (err, rows) => {
      resolve(rows);
    });
  });
}

export async function newListItem(item, list) {
  db.run("INSERT INTO listEntries(txt, list, uuid) VALUES(?, ?, ?)", [
    item,
    list,
    crypto.randomUUID(),
  ]);
}

export async function getListItems(list) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM listEntries WHERE list = ?", [list], (err, rows) => {
      console.log("LIST: ", list);
      console.log("ROWS: ", rows);
      resolve(rows);
    });
  });
}
