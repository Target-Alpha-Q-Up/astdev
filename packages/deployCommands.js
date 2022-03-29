const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

// ADD COMMANDS

// const commands = [
// 	new SlashCommandBuilder()
// 		.setName("presence")
// 		.setDescription("Changes the bots presence")
// 		.addStringOption(option => 
// 			option.setName("content")
// 			.setDescription("The content to display")
// 			.setRequired(true)	
// 		)
// 		.addStringOption(option =>
// 			option.setName("type")
// 			.setDescription("The type of activity to set")
// 			.setRequired(true)
// 		)
// 		.addStringOption(option =>
// 			option.setName("status")
// 			.setDescription("The status type to display")
// 			.setRequired(true)
// 		)
// ]
// 	.map(command => command.toJSON());

// const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationCommands(clientId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

// DELETE COMMANDS
    
// const rest = new REST({ version: '9' }).setToken(token);
// rest.get(Routes.applicationCommands(clientId))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });

