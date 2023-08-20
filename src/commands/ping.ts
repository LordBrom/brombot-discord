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
		const time = new Date();
		const timeStr = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
		await interaction.reply({ content: `Boing-oing, The current time is ${timeStr}`, ephemeral: true });
	}
};
