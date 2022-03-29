// Require the necessary classes
const { Client, Intents, Collection } = require('discord.js');
const fs = require('node:fs')
const ascii = require('ascii-table');
const config = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// Attach the config to the CLIENT so it's accessible everywhere
client.config = config;

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

function eventHandler() {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    let table = new ascii("Loading Events");
	table.setHeading("Event File", "Load Status");

	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		
        if(event) {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }

            table.addRow(file, "✔");
        } else {
            table.addRow(file, "❌");
        }
	};

    console.log(table.toString());
}

function tCommandHandler() {
	const commandFiles = fs.readdirSync("./tCommands").filter(file => file.endsWith(".js"));
	client.commands = new Collection();
	let table = new ascii("Loading Text Commands");
	table.setHeading("Command File", "Load Status");

	for (const file of commandFiles) {
		const command = require(`./tCommands/${file}`);
	
		if(command) {
			client.commands.set(command.name, command);

			table.addRow(file, "✔");
		} else {
			table.addRow(file, "❌");
		};
	};

	console.log(table.toString());
}

function sCommandHandler() {
	const commandFiles = fs.readdirSync("./sCommands").filter(file => file.endsWith(".js"));
	client.slsCommands = new Collection();
	let table = new ascii("Loading Slash Commands");
	table.setHeading("Command File", "Load Status");

	for (const file of commandFiles) {
		const command = require(`./sCommands/${file}`);
	
		if(command) {
			client.slsCommands.set(command.data.name, command);

			table.addRow(file, "✔");
		} else {
			table.addRow(file, "❌");
		};
	};

	console.log(table.toString());
}

tCommandHandler();
sCommandHandler();
eventHandler();
// Login to Discord with your client's token
client.login(config.token);
