const Commando = require('discord.js-commando');

let client;

module.exports = class TestCommand extends Commando.Command {
	constructor(_client) {
		client = _client;
		super(_client, {
			name: 'status',
			group: 'mod',
			memberName: 'status',
			description: 'Sets the user presence activity.'
		});
	}

	async run(message, args) {
		client.user.setStatus('invisible')
			.then(console.log)
			.catch(console.error);
		//client.user.setPresence({
		//	activity: {
		//		name: args,
		//		type: 0
		//	}
		//})
	}
}
