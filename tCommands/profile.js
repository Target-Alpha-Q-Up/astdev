const DataClient = require("../packages/dataHandler.js");
const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "profile",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        const dataClientNative = new DataClient("native");

        if(args.length == 0) {
            dataClientNative.fetch_one("players", { "id": message.author.id.toString() }).then(fetch => {
                if(fetch) {
                    dataClientNative.find_one("players", { "id": message.author.id.toString() }).then(results => {
                        const profileEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(`${results["name"]}'s Profile`)
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setDescription(`${results["profession"]} -> ${results["class"]}`)
                            .addFields(
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Level', value: `${results["level"]}`, inline: true},
                                { name: 'Experience', value: `${results["xp"]}`, inline: true},
                                { name: 'Gold', value: `${results["gold"]}`, inline: true},
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Health Points', value: `${results["hp"]}`, inline: true },
                                { name: 'Damage', value: `${results["dm"]}`, inline: true },
                                { name: 'Defense', value: `${results["df"]}`, inline: true },
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Accessory', value: `${results["accessory"]}`, inline: true},
                                { name: 'Armor', value: `${results["armor"]}`, inline: true},
                                { name: 'Weapon', value: `${results["weapon"]}`, inline: true}
                            )
                            .setTimestamp();
                        
                        message.channel.send({ embeds: [profileEmbed] });
                    });
                } else message.channel.send("Failed: Player not registered.");
            });
        } else {
            dataClientNative.fetch_one("players", { "id": args[0].toString() }).then(fetch => {
                if(fetch) {
                    dataClientNative.find_one("players", { "id": args[0].toString() }).then(results => {
                        const profileEmbed = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(`${results["name"]}'s Profile`)
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setDescription(`${results["profession"]} -> ${results["class"]}`)
                            .addFields(
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Level', value: `${results["level"]}`, inline: true},
                                { name: 'Experience', value: `${results["xp"]}`, inline: true},
                                { name: 'Gold', value: `${results["gold"]}`, inline: true},
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Health Points', value: `${results["hp"]}`, inline: true },
                                { name: 'Damage', value: `${results["dm"]}`, inline: true },
                                { name: 'Defense', value: `${results["df"]}`, inline: true },
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Accessory', value: `${results["accessory"]}`, inline: true},
                                { name: 'Armor', value: `${results["armor"]}`, inline: true},
                                { name: 'Weapon', value: `${results["weapon"]}`, inline: true}
                            )
                            .setTimestamp();
                        
                        message.channel.send({ embeds: [profileEmbed] });
                    });
                } else message.channel.send("Failed: Player not registered.");
            });
        };
    }
};
