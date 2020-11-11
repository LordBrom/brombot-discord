const Commando = require('discord.js-commando');
const ds = require('../../modules/deleteSelf');
//const handleError = require("../../modules/handleError");

let client;

module.exports = class StopCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
			description: 'Stops audio.'
		});
	}

	async run(message, args) {
		if (message.member.voice.channel) {
			let channelID = message.member.voice.channel.id;
			if (client.queueController[channelID]) {
				client.queueController[channelID].pause();
			}
		} else {
			message.channel.send('You must be in a voice channel').then(ds);
		}
		message.delete();
	}
}

