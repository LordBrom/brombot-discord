const Commando = require('discord.js-commando');
const config = require('./config.json');
const path = require('path');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');

if (!fs.existsSync('./logs')) {
	fs.mkdirSync('./logs');
}

const serverLog = require('logger').createLogger('./logs/log_server.log');
const handleError = require("./modules/handleError");

var isDev = true;

let token;
let mongoDbName;
if (isDev) {
	token = config.token_dev;
	mongoDbName = config.mongoDbName_Dev;
} else {
	token = config.token;
	mongoDbName = config.mongoDbName;
}

const client = new Commando.CommandoClient({
	owner: config.owner,
	commandPrefix: config.commandPrefix
});

client.setProvider(
	MongoClient.connect(config.mongoURI).then(client => new MongoDBProvider(client, mongoDbName))
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

client.login(token);
