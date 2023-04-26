import { SlashCommandBuilder, Interaction } from 'discord.js'
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: {
		name: 'leave',
		description: 'Forced BromBot to leave the audio chat.'
	},

	builder: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Forced BromBot to leave the audio chat.'),

	async execute(interaction: any) {
		const connection = getVoiceConnection(interaction.guild.id);
		if (!connection) {
			await interaction.reply({ content: "I'm not in a voice channel.", ephemeral: true });
			return;
		}

		connection.destroy();

		await interaction.reply({ content: 'Byyyeeeeeee!', ephemeral: true });
	}
};
