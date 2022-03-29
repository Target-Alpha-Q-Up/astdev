const DataClient = require('../packages/dataHandler.js');
const { Client, Message } = require("discord.js")

module.exports = {
    name: "register",

    /**
   * 
   * @param {Client} client
   * @param {Message} message 
   */

    run: async (client, message, args) => {
        if (args.length == 0) {
            let msg = message.channel.send("Please enter player nickname. You can change this later with `;nickname`\nMinimum of 3 characters, maximum of 15.\nOnly characters `A-Z`, `a-z`, `0-9` and `-`.");

            let filter = m => m.author.id == message.author.id;
            message.channel.awaitMessages({ filter: filter, max: 1, time: 30000, errors: ["time"] })
                .then(collected => {
                    collected = collected.first();

                    if(args.length == 0) {
                        if (collected.content.length >= 3) {
                            if (collected.content.length <= 15) {
                                if(/^[a-z0-9-]+$/i.test(collected.content)) {
                                    const dataClientNative = new DataClient("native");

                                    dataClientNative.insert_one("players", {
                                        "name": collected.content,
                                        "id": message.author.id.toString(),
                                        "level": 1,
                                        "xp": 0,
                                        "profession": "",
                                        "class": "",
                                        "hp": 0,
                                        "df": 0,
                                        "dm": 0,
                                        "accessory": "",
                                        "armor": "",
                                        "weapon": "",
                                        "inventory": [],
                                        "gold": 0,
                                        "realm": 0,
                                        "adventure": 0,
                                        "ad_block": 0,
                                        "pass_block": 0,
                                        "act_block_1": 0,
                                        "act_block_2": 0
                                    });

                                    message.channel.send(`Successfully registered as player \`${collected.content}\``);
                                } else {
                                    message.channel.send("Failed: Only characters `A-Z`, `a-z`, `0-9` and `-`.")
                                };
                            } else {
                                message.channel.send("Failed: Cannot exceed 15 characters");
                            };
                        } else {
                            message.channel.send('Failed: Minimum of 3 characters.');
                        };
                    } else {
                        if(['profession'].includes(args[0])) {
                            args.shift();

                            message.channel.send("Profession");
                        } else {
                            message.channel.send("Failed: Unknown arguments.")
                        };
                    };
                })
                .catch(err => {
                    message.channel.send("Timeout: Canceled operation.")
                });
        };
    }
};
