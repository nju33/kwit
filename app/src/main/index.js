'use strict'

import path from 'path';
import fs from 'fs';
import {app, BrowserWindow, ipcMain} from 'electron'
import lowdb from 'lowdb';

const dbDir = path.join(app.getPath('home'), '.kwit');
try {
  fs.accessSync(dbDir, fs.constants.F_OK);
} catch (err) {
  fs.mkdirSync(dbDir);
}

const dbFile = path.join(dbDir, 'db.json');
try {
  fs.accessSync(dbFile, fs.constants.F_OK);
} catch (err) {
  fs.writeFileSync(dbFile, '');
}

const db = lowdb(dbFile);
db.defaults({settting: {}});

ipcMain.on('db:set', ({sender}, field, data) => {
  try {
    db.set(field, data).write();
  } catch (err) {
    console.log(err);
    sender.send('error', err.message);
  }
});

ipcMain.on('db:push', ({sender}, field, data) => {
  try {
    db.get(field).push(data).write();
  } catch (err) {
    console.log(err);
    sender.send('error', err.message);
  }
});

ipcMain.on('db:get', ({sender}, field) => {
  const data = db.get(field).value()
  sender.send('db:get:res', data);
});

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
