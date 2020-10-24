const Commando = require('discord.js-commando');

let client;

module.exports = class TestCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'clearmessages',
			group: 'mod',
			memberName: 'clearmessages',
			description: 'Clears messages in channel.'
		});
	}

	async run(message, args) {
		client.guilds.cache.forEach((guild) => {
			console.log(guild);
			//message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
		})
	}
}
