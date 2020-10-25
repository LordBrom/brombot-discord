const Commando = require('discord.js-commando');
//const config = require('./config.json');
const config = process.env;
const path = require('path');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');

if (!fs.existsSync('./logs')) {
	fs.mkdirSync('./logs');
}

const serverLog = require('logger').createLogger('./logs/log_server.log');
const handleError = require("./modules/handleError");

const client = new Commando.CommandoClient({
	owner: config.owner
});

client.setProvider(
	MongoClient.connect(config.mongoURI).then(client => new MongoDBProvider(client, config.mongoDbName))
).catch(handleError);

client.on('ready', async () => {
	serverLog.info('Connected');
	console.log(`Logged in as ${client.user.tag}!`);

	client.registry
		.registerGroups([
			['main', 'main commands'],
			['mod', 'moderator commands']
		])
		.registerDefaults()
		.registerCommandsIn(path.join(__dirname, 'commands'));
}, handleError);

client.login(config.token);
