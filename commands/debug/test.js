const Commando = require('discord.js-commando');
const ytdl = require('ytdl-core-discord');
const handleError = require("../../modules/handleError");

let client;

let queueController = {};

module.exports = class TestCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'test',
			group: 'debug',
			memberName: 'test',
			description: 'Test command'
		});
	}

	async run(message, args) {
		console.log(client.queueController)
	}
}
