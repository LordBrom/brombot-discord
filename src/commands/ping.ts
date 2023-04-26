import { SlashCommandBuilder, Interaction } from 'discord.js'

module.exports = {
	data: {
		name: 'ping',
		description: 'Replies with Pong!'
	},

	builder: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction: any) {
		await interaction.reply({ content: 'Pong test!', ephemeral: true });
	}
};
