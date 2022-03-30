const { SlashCommandBuilder } = require('@discordjs/builders');
const DataClient = require("../packages/dataHandler.js");
const { ownerId } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playerreset")
        .setDescription("Reset the player database"),

    run: async (interaction) => {
        if(interaction.user.id == ownerId) {
            const dataClientNative = new DataClient("native");

            dataClientNative.delete_many("players", {});

            await interaction.reply({ content: "Player database reset", ephemeral: true });
        } else {
            await interaction.reply({ content: "You don't have the proper permissions", ephemeral: true });
        };
    }
};
