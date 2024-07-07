const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: async (apiKey, userInput) => {
    try {
      const response = await ipcRenderer.invoke('chat:request', apiKey, userInput);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
});
