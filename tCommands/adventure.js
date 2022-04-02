const DataClient = require("../packages/dataHandler.js");
const { Client, Message, MessageEmbed } = require("discord.js")
const { checkLevelUp, levelCalc } = require("../packages/battleTools.js");
const { inBetween } = require("../packages/battleTools.js");

module.exports = {
    name: "adventure",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        const dataClientCore = new DataClient("core");
        const dataClientNative = new DataClient("native");

        if (args.length == 0) {
            dataClientNative.fetch_one("players", { "id": message.author.id.toString() }).then(fetch => {
                if (fetch) {
                    dataClientNative.find_one("players", { "id": message.author.id.toString() }).then(results => {
                        if (results["adventure"] !== 0) {
                            dataClientCore.find_one("adventures", { "id": parseInt(results["adventure"]) }).then(aResults => {
                                const elapsedTime = Math.floor((Date.now() - results["ad_block"]) / 1000);
                                if (elapsedTime >= parseInt(aResults["time"])) {
                                    // SUCCESS/FAILURE MECHANICS

                                    let adventureStat = parseInt(aResults["dm"]) + parseInt(aResults["df"]);
                                    let playerStat = parseInt(results["dm"]) + parseInt(results["df"]);
                                    let successRate = Math.round((playerStat / adventureStat) * 100);


                                    
                                    if(successRate >= inBetween(1, 100)) {
                                        xp = results["xp"] + inBetween(aResults["range_c"], aResults["range_d"]);
                                        level = results["level"];
                                        var note = `Adventure successful, ${xp - results["xp"]}xp rewarded.`;

                                        if(checkLevelUp(level, xp)) {
                                            level = levelCalc(xp);
                                            note = note + `\nLevel up, reached level ${level}.`;
                                        };

                                        dataClientNative.update_one("players", { "id": message.author.id.toString() }, {
                                            $set: {
                                                "adventure": 0,
                                                "ad_block": 0,
                                                "xp": xp,
                                                "level": level
                                            }
                                        });

                                        message.channel.send(note);
                                    } else {
                                        dataClientNative.update_one("players", { "id": message.author.id.toString() }, {
                                            $set: {
                                                "adventure": 0,
                                                "ad_block": 0
                                            }
                                        });

                                        message.channel.send("Adventure failed.");
                                    };
                                } else message.channel.send(`Adventure pending. ${(parseInt(aResults["time"]) - elapsedTime)}s remaining`);
                            });
                        } else message.channel.send("Failed: Player not on an adventure.");
                    });
                } else message.channel.send("Failed: Player not registered.");
            });
        } else {
            if(['1', '2'].includes(args[0])) {
                dataClientNative.fetch_one("players", {"id":message.author.id.toString()}).then(fetch => {
                    if(fetch) {
                        dataClientNative.find_one("players", {"id":message.author.id.toString()}).then(results => {
                            if(results["adventure"] == 0) {
                                dataClientNative.update_one("players", {"id":message.author.id.toString()}, {
                                    $set: {
                                        "adventure": parseInt(args[0]),
                                        "ad_block": Date.now()
                                    }
                                });

                                message.channel.send("Adventure successfully started.");
                            } else message.channel.send("Failed: Player already on an adventure.");
                        });
                    } else message.channel.send("Failed: Player not registered.");
                });
            };
        };
    }
};