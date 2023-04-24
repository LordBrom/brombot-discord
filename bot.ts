require('dotenv').config();

import Discord, { Interaction, GuildMember } from 'discord.js';
import {
	joinVoiceChannel,
} from '@discordjs/voice';

const discordToken = process.env.TOKEN;

const client = new Discord.Client({ intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds', 'MessageContent']});

client.on('ready', () => console.log("Ready"));

client.on('messageCreate', (message) => {
	if (!message.guild) { return; }
	//if (!client.application?.owner) { await client.application?.fetch(); }
	console.log(message);
	console.log(message.content);
	if (message.content.toLowerCase() === '!play') {
		if (message.member instanceof GuildMember) {
			if (!message.member.voice.channel) {
				console.log("no voice channel");
				return;
			}
			const channel = message.member.voice.channel;
			joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			})

		}

	}
})


client.on('error', console.warn);

void client.login(discordToken);



