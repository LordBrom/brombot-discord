const Commando = require('discord.js-commando');

module.exports = class TestCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'main',
			memberName: 'test',
			description: 'this is a test command',
			argsType: 'multiple'
		});
	}

	async run(message, args) {
		console.log(message);
		console.log(args);
	}
}
