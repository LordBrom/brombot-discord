const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core-discord');
const ffmpeg = require('ffmpeg');

let client;

let dispatchController = {};

module.exports = class TestCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'play',
			group: 'main',
			memberName: 'play',
			description: 'Plays a YouTube video',
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		if (message.member.voice.channel) {
			let channelID = message.member.voice.channel.id;
			switch (args[0]) {
				case "stop":
					if (!dispatchController[channelID]) {
						message.channel.send('Nothing playing.');
						return;
					}
					dispatchController[channelID].pause();
					client.user.setActivity();
					break;

				default:
					var connection = await message.member.voice.channel.join();
					dispatchController[channelID] = await play(connection, args[0]);
					client.user.setActivity("music");
					break;
		}
		} else {
			message.channel.send('You must be in a voice channel');
		}
		message.delete();
	}
}

async function play(connection, url) {
	console.log(url);
	let dispatcher = connection.play(await ytdl(url), { type: 'opus' });

	dispatcher.on('start', () => {
		console.log('audio is now playing!');
	});
	dispatcher.on('error', handleError);

	return dispatcher;
}

var handleError = function (err, rsp) {
	errorLog.error("======================")
	errorLog.error(err, rsp)
	errorLog.error("======================")
}
