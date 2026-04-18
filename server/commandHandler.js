const fileManager = require("./fileManager");
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
      }
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
