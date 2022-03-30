const DataClient = require('../packages/dataHandler.js');
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "register",

    /**
   * 
   * @param {Client} client
   * @param {Message} message 
   */

    run: async (client, message, args) => {
        const dataClientNative = new DataClient("native");
        const dataClientCore = new DataClient("core");

        dataClientNative.fetch_one("players", {
            "id": message.author.id.toString()
        }).then(fetch => {
            if (args.length == 0) {
                if(!fetch) {
                    let msg = message.channel.send("Please enter player nickname. You can change this later with `;nickname`\nMinimum of 3 characters, maximum of 15.\nOnly characters `A-Z`, `a-z`, `0-9` and `-`.");
    
                    let filter = m => m.author.id == message.author.id;
                    message.channel.awaitMessages({ filter: filter, max: 1, time: 30000, errors: ["time"] })
                        .then(collected => {
                            collected = collected.first();
    
                            if (collected.content.length >= 3) {
                                if (collected.content.length <= 15) {
                                    if(/^[a-z0-9-]+$/i.test(collected.content)) {
                                        dataClientNative.insert_one("players", {
                                            "name": collected.content,
                                            "id": message.author.id.toString(),
                                            "level": 1,
                                            "xp": 0,
                                            "profession": "",
                                            "class": "",
                                            "hp": 100,
                                            "df": 5,
                                            "dm": 5,
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
                                    message.channel.send("Failed: Cannot exceed 15 characters.");
                                };
                            } else {
                                message.channel.send('Failed: Minimum of 3 characters.');
                            };
                        })
                        .catch(err => {
                            message.channel.send("Timeout: Canceled operation.")
                        });
                } else {
                    message.channel.send("Failed: Player already registered.")
                };
            }  else {
                if(fetch) {
                    dataClientNative.find_one("players", { "id": message.author.id.toString()}).then(results => {
                        if(results["profession"] == "") {
                            if(['profession'].includes(args[0])) {
                                args.shift();
                                
                                const profEmbed = new MessageEmbed()
                                    .setTitle("PROFESSIONS:")
                                    .setDescription("Every hero needs a major profession! Pick one from the list below and continue on your journey.")
                                    .addFields(
                                        { name: '\u200B', value: '\u200B' },
                                        { name: 'SOUND', value: 'Manipulate the invisible vibrations of sound in the air and make your foes concede.' },
                                        { name: 'MELEE', value: 'Brute strength combined with little wits create a truly unpredictable rage that will wipe enemies off the field.' },
                                        { name: 'MAGIC', value: 'Harness the acane forces and cause inevitable chaos upon those who dare face you.'},
                                        { name: 'RANGED', value: 'Hide in the shadows and unleash fury on oppenents from a distance.'},
                                    )
        
                                message.channel.send({ embeds: [profEmbed] });
        
                                let filter = m => m.author.id == message.author.id;
                                message.channel.awaitMessages({ filter: filter, max: 1, time: 30000, errors: ["time"] })
                                        .then(collected => {
                                            collected = collected.first()
        
                                            if(['sound', 'melee', 'magic', 'ranged'].includes(collected.content.toLowerCase())) {
                                                dataClientCore.find_one("professions", {
                                                    "profession": collected.content.toLowerCase()
                                                }).then(results => {
                                                    let query = {
                                                        "id": message.author.id.toString()
                                                    };
        
                                                    let bonus = results["classes"]["1"]["bonus"];
                                                    var modifiers = bonus.split("/")[0];
                                                    modifiers = modifiers.split(".");
                                                    let prof = collected.content.toLowerCase();
                                                    if(prof == "sound") {
                                                        dataClientNative.update_one("players", query, { $set: {
                                                            "profession": prof,
                                                            "class": results["classes"]['1']['name'],
                                                            "hp": (parseInt(modifiers[0]) + 100)
                                                        } });
                                                    } else if(prof == "melee") {
                                                        dataClientNative.update_one("players", query, { $set: {
                                                            "profession": prof,
                                                            "class": results["classes"]['1']['name'],
                                                            "dm": (parseInt(modifiers[0]) + 5),
                                                            "df": (parseInt(modifiers[1]) + 5)
                                                        } });
                                                    } else if(prof == "magic") {
                                                        dataClientNative.update_one("players", query, { $set: {
                                                            "profession": prof,
                                                            "class": results["classes"]['1']['name'],
                                                            "hp": (parseInt(modifiers[0]) + 100),
                                                            "dm": (parseInt(modifiers[1]) + 5)
                                                        } });
                                                    } else if(prof == "ranged") {
                                                        dataClientNative.update_one("players", query, { $set: {
                                                            "profession": prof,
                                                            "class": results["classes"]['1']['name'],
                                                            "hp": (parseInt(modifiers[0]) + 100),
                                                            "df": (parseInt(modifiers[1]) + 5)
                                                        } });
                                                    };
        
                                                    message.channel.send(`Succesfully assigned profession \`${collected.content.toLowerCase()}\` and related class \`${results["classes"]["1"]["name"]}\`.`);
                                                });
                                            } else {
                                                message.channel.send("Failed: Unknown profession.");
                                            };
                                        })
                                        .catch(err => {
                                            message.channel.send("Timeout: Canceled operation.")
                                        });
                            } else {
                                message.channel.send("Failed: Unknown arguments.");
                            };
                        } else {
                            message.channel.send("Failed: Player already assigned a profession.")
                        };
                    });
                } else {
                    message.channel.send("Failed: Player not registered.");
                };
            };
        });
    }
};
