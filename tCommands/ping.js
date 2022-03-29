const { Client, Message } = require("discord.js")

module.exports = {
    name: "ping",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        message.channel.send("Pong!").catch(console.error);
    }
};
