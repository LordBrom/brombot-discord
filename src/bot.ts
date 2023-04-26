require('dotenv').config();
const config = process.env;

import { Interaction } from 'discord.js';
import MyClient from './Client';
//import {
//	joinVoiceChannel,
//} from '@discordjs/voice';

const discordToken = config.TOKEN;

const client = new MyClient({ intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds', 'MessageContent'] });

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) { return; }

	const { commandName } = interaction;

	const command = client.commands.get(commandName);

	if (!command) {
		console.warn(`Command "${commandName}" not found.`)
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
})


client.on('ready', () => {
	const guild = client.guilds.cache.get(config?.TEST_GUILD || '');
	if (guild) {
		client.registerCommands(guild);
	}


	console.log("Ready");
});

client.on('error', console.warn);
void client.login(discordToken);
