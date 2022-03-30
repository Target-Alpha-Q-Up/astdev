const DataClient = require("../packages/dataHandler.js");
const { Client, Message } = require("discord.js")
const { checkLevelUp, levelCalc } = require("../packages/battleTools.js");

module.exports = {
    name: "adventure",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        const dataClientCore = new DataClient("core");
        const dataClientNative = new DataClient("native");
    }
};
