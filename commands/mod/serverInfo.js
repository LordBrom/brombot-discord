const Commando = require('discord.js-commando');

let client;

module.exports = class TestCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'serverinfo',
			group: 'mod',
			memberName: 'serverinfo',
			description: 'Get info on servers.'
		});
	}

	async run(message, args) {
		client.guilds.cache.forEach((guild) => {
			console.log(guild);
			//message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
		})
	}
}
