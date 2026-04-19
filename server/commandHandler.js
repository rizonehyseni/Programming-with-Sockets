const fileManager = require("./fileHandler");
const clientManager = require("./clientManager");

module.exports = {
  handle(msg, clientKey) {
    const isAdmin = clientManager.isAdmin(clientKey);
    const response = {
      type: "response",
      status: "ok",
      isAdmin: isAdmin,
    };

    try {
      const cmd = msg.command.toLowerCase();

      if (!isAdmin && ["upload", "delete"].includes(cmd)) {
        throw new Error("Leje e mohuar. Vetem admini ka qasje te plote");
      }
      switch (cmd) {
        case "list":
          response.data = fileManager.listFiles();
          break;

        case "read":
          response.data = fileManager.readFile(msg.filename);
          break;

        case "search":
          response.data = fileManager.searchFiles(msg.keyword);
          break;

        case "info":
          response.data = fileManager.getFileInfo(msg.filename);
          break;

        case "upload":
          if (!msg.filename || !msg.data) {
            throw new Error("Mungon emri i file ose te dhenat");
          }
          fileManager.uploadFile(msg.filename, msg.data);
          response.message = `File ${msg.filename} u ngarkua me sukses nga admini`;
          break;

        case "download":
          if (!msg.filename) {
            throw new Error("Mungon emri i file");
          }
          const base64 = fileManager.downloadFile(msg.filename);
          response.data = { filename: msg.filename, content: base64 };
          break;
        case "delete":
          fileManager.deleteFile(msg.filename);
          response.message = `File ${msg.filename} u fshi me sukses nga admini`;
          break;

        default:
          throw new Error("Komande e panjohur");
      }
      return response;
    } catch (err) {
      return {
        type: "response",
        status: "error",
        message: err.message,
        isAdmin: isAdmin,
      };
    }
  },
};
