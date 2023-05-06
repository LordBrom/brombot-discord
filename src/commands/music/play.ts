import { SlashCommandBuilder, Interaction } from 'discord.js'
import ytdl from 'ytdl-core';
const {
	joinVoiceChannel,
	getVoiceConnection,
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
	VoiceConnectionStatus,
	entersState
} = require('@discordjs/voice');


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
		const songUrl = "https://www.youtube.com/watch?v=gOMhN-hfMtY";
		//const songUrl = interaction.options.getString('song');

		let connection = getVoiceConnection(interaction.guild.id);
		if (!connection) {
			const channel = interaction.member.voice.channel;

			if (!channel) {
				await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
				return;
			}

			connection = await joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
			connection.on(VoiceConnectionStatus.Disconnected, async (oldState: any, newState: any) => {
				try {
					await Promise.race([
						entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
						entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
					]);
					// Seems to be reconnecting to a new channel - ignore disconnect
				} catch (error) {
					// Seems to be a real disconnect which SHOULDN'T be recovered from
					connection.destroy();
				}
			});
		}





		try {
			var vidID = ytdl.getURLVideoID(songUrl);
			var info = await ytdl.getInfo(vidID);
			var songTitle = info.videoDetails.title;

			const player = createAudioPlayer();
			const ytVid = ytdl(songUrl, { filter: 'audioonly' });
			const stream = await createAudioResource(ytVid);
			player.play(stream, { seek: 0, volume: 1 });

			player.on(AudioPlayerStatus.Playing, async () => {
				await interaction.reply({ content: 'Audio started!\n' + songTitle, ephemeral: true });
			});
			player.on('error', (error: any) => {
				console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
			});

			connection.subscribe(player);
			connection.player = player;

		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Audio failed to play...' + songUrl, ephemeral: true });
			return;
		}
	}
};
