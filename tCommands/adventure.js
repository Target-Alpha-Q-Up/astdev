const DataClient = require("../packages/dataHandler.js");
const { Client, Message, MessageEmbed } = require("discord.js")
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

        if(args.length == 0) {
            dataClientNative.fetch_one("players", {"id":message.author.id.toString()}).then(fetch => {
                if(fetch) {} else message.channel.send("Failed: Player not registered.");
            });
        } else {
            if(['1', '2'].includes(args[0])) {
                dataClientNative.fetch_one("players", {"id":message.author.id.toString()}).then(fetch => {
                    if(fetch) {
                        dataClientNative.find_one("players", {"id":message.author.id.toString()}).then(results => {
                            if(results["adventure"] == 0) {
                                dataClientNative.update_one("players", {"id":message.author.id.toString()}, {
                                    "adventure": parseInt(args[0]),
                                    "ad_block": Date.now()
                                });
                            } else message.channel.send("Failed: Player already on an adventure.");
                        });
                    } else message.channel.send("Failed: Player not registered.");
                });
            };
        };
    }
};
