const { app, BrowserWindow, ipcMain } = require('electron');
const OpenAI = require('openai');
const path = require('path');

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
        apiKey: apiKey
      });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userInput}],
        model: "gpt-4-turbo",
      });
    
    const response = completion.choices[0].message.content;

    return response;
  });