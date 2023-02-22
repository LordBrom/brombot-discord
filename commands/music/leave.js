const Commando = require('discord.js-commando');
const ds = require('../../modules/deleteSelf');
//const handleError = require("../../modules/handleError");

let client;

module.exports = class LeaveCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'Makes BromBot leave current voice channel.'
		});
	}

	async run(message, args) {
		if (message.member.voice.channel) {
			let channelID = message.member.voice.channel.id;
			if (client.queueController[channelID]) {
				client.queueController[channelID].pause();
				client.queueController[channelID].clear();
				delete client.queueController[channelID];

			}
			await message.member.voice.channel.leave();
		} else {
			message.channel.send('You must be in a voice channel').then(ds);
		}
		message.delete();
	}
}

