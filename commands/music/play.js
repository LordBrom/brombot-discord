const Commando = require('discord.js-commando');
const ytQueue = require('../../modules/ytQueue');
const ds = require('../../modules/deleteSelf');
const handleError = require("../../modules/handleError");

let client;

//let queueController = {};

module.exports = class PlayCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Plays audio from youtube url.'
		});
	}

	async run(message, args) {
		if (message.member.voice.channel) {
			let channelID = message.member.voice.channel.id;
			if (!client.queueController[channelID]) {
				var connection = await message.member.voice.channel.join();
				client.queueController[channelID] = new ytQueue(connection);
			}

			client.queueController[channelID].play(args);
		} else {
			message.channel.send('You must be in a voice channel').then(ds);
		}
		message.delete();
	}
}
