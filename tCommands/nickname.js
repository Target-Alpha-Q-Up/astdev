const { Client, Message } = require("discord.js")

module.exports = {
    name: "nickname",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        message.channel.send("Nickname").catch(console.error);
    }
};
