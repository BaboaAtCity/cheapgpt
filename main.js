const { app, BrowserWindow, ipcMain } = require('electron');
const OpenAI = require('openai');
const fs = require('fs'); 
const path = require('path'); 
const keyPath = path.join(__dirname, 'key.txt'); 

function loadApiKey(keyPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(keyPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        apiKey = data.trim();
        resolve(apiKey);
      });
    });
  }
  
function getApiKey() {
    return apiKey;
}

loadApiKey(keyPath);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('chat:request', async (event, apiKey, userInput) => {


    const openai = new OpenAI({
        apiKey: getApiKey()
      });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userInput}],
        model: "gpt-3.5-turbo",
      });
    
    const response = completion.choices[0].message.content;

    return response;
  });