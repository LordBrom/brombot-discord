const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const ytQueue = require('../../modules/ytQueue');
const ds = require('../../modules/deleteSelf');
//const handleError = require("../../modules/handleError");

let client;

module.exports = class QueueCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
			description: 'Shows or adds songs in the queue.'
		});
	}

	async run(message, args) {
		if (message.member.voice.channel) {
			let channelID = message.member.voice.channel.id;
			if (args) {
				if (!client.queueController[channelID]) {
					var connection = await message.member.voice.channel.join();
					client.queueController[channelID] = new ytQueue(connection);
				}
				if (ytdl.validateURL(args)) {
					client.queueController[channelID].add(args);
				}
			} else {
				if (!client.queueController[channelID]) {
					message.reply("No queue started.").then(ds);
				} else {
					let nowPlaying = client.queueController[channelID].getPlaying();
					let vidQueue = client.queueController[channelID].getQueue();
					let response = "";
					if (nowPlaying) {
						response += `Now playing: ${nowPlaying.title}.\n`;
					}
					response += `The current queue has ${vidQueue.length} videos in it:\n`;
					let index = 1;
					vidQueue.forEach((videoName) => {
						response += `${index++}. ${videoName}\n`
					});
					message.reply(response);
				}
			}
		} else {
			message.channel.send('You must be in a voice channel').then(ds);
		}
		message.delete();
	}
}

