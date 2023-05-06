import { SlashCommandBuilder, Interaction } from 'discord.js'
import ytdl from 'ytdl-core';
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');


module.exports = {
	data: {
		name: 'stop',
		description: 'Stops the audio',
	},

	builder: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the audio'),

	async execute(interaction: any) {
		const connection = getVoiceConnection(interaction.guild.id);
		if (!connection) {
			await interaction.reply({ content: "I'm not in a voice channel.", ephemeral: true });
			return;
		}

		connection.player.stop();

		await interaction.reply({ content: 'Stopped.', ephemeral: true });
	}
};
