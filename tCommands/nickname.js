const DataClient = require("../packages/dataHandler.js");
const { Client, Message } = require("discord.js")

module.exports = {
    name: "nickname",

    /**
   * @param {Client} client
   * @param {Message} message
   */

    run: async (client, message, args) => {
        const dataClientNative = new DataClient("native");

        dataClientNative.fetch_one("players", {
            "id": message.author.id.toString()
        }).then(fetch => {
            if(fetch) {
                if(args.length !== 0) {
                    const name = args[0];

                    if(name.length >= 3) {
                        if(name.length <= 15) {
                            if(/^[a-z0-9-]+$/i.test(name)) {
                                let query = {
                                    "id": message.author.id.toString()
                                };

                                dataClientNative.update_one("players", query, { $set: {
                                    "name": name
                                } });

                                message.channel.send(`Nickname succesfully updated to \`${name}\``);
                            } else  message.channel.send("Failed: Only characters `A-Z`, `a-z`, `0-9` and `-`.");
                        } else message.channel.send("Failed: Cannot exceed 15 characters.");
                    } else message.channel.send("Failed: Minimum of 3 characters.");
                } else  message.channel.send("Failed: Required argument `name`.");
            } else message.channel.send("Failed: Player not registered.");
        });
    }
};
