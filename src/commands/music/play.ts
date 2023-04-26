import { SlashCommandBuilder, Interaction } from 'discord.js'
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = {
	data: {
		name: 'play',
		description: 'Plays audio from YouTube url.',
		options: [
			{
				name: 'song',
				type: 3,
				description: 'The YouTube URL of the song to play',
				required: true,
			},
		],
	},

	builder: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays audio from YouTube url.'),

	async execute(interaction: any) {
		const songUrl = interaction.options.getString('song');
		const channel = interaction.member.voice.channel;

		if (!channel) {
			await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
			return;
		}

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		await interaction.reply({ content: 'Audio started (not really)!' + songUrl, ephemeral: true });
	}
};
