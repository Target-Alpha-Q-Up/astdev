const { SlashCommandBuilder } = require('@discordjs/builders');
const { ownerId } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("presence")
        .setDescription("Changes the bots presence")
        .addStringOption(option => 
            option.setName("content")
            .setDescription("The content to display")
            .setRequired(true)	
        )
        .addStringOption(option =>
            option.setName("type")
            .setDescription("The type of activity to set")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("status")
            .setDescription("The status type to display")
            .setRequired(true)
        ),

	run: async (interaction) => {
        if(interaction.user.id === ownerId) {
            let c = interaction.options.getString("content");
            let t = interaction.options.getString("type");
            let s = interaction.options.getString("status");

            await interaction.client.user.setActivity(c, t);
            await interaction.client.user.setStatus(s);
            await interaction.reply({ content: "Presence updated", ephemeral: true });
        } else {
            await interaction.reply({ content: "You don't have the proper permissions", ephemeral: true });
        };
	},
};

