require('dotenv').config();
const Commando = require('discord.js-commando');
const config = process.env;
const path = require('path');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');

const express = require('express');
const PORT = process.env.PORT || 5000;

express()
	.get('/', (req, res) => res.send('BromBot'))
	.listen(PORT, () => console.log(`Listening on ${PORT}`))

if (!fs.existsSync('./logs')) {
	fs.mkdirSync('./logs');
}

const serverLog = require('logger').createLogger('./logs/log_server.log');
const handleError = require("./modules/handleError");

const client = new Commando.CommandoClient({
	owner: config.owner
});

client.queueController = {};

client.setProvider(
	MongoClient.connect(config.mongoURI).then(client => new MongoDBProvider(client, config.mongoDbName))
).catch(handleError);

client.on('ready', async () => {
	serverLog.info('Connected');
	console.log(`Logged in as ${client.user.tag}!`);

	client.registry
		.registerGroups([
			['music', 'music commands'],
			['debug', 'debug commands']
		])
		.registerDefaults()
		.registerCommandsIn(path.join(__dirname, 'commands'));
}, handleError);

client.on('reconnecting', () => {
	serverLog.log('Reconnecting!');
});
client.on('disconnect', () => {
	serverLog.log('Disconnect!');
});

client.login(config.token);
