import { Client, Collection, Guild } from "discord.js";
import fs from 'node:fs';
import path from 'node:path';

export default class MyClient extends Client {
	commands: Collection<string, any> // use correct type :)
	constructor(options: any) {
		super(options)
		this.commands = new Collection();
		this.loadCommands()
	}
	loadCommands() {
		const rootPath = path.join(__dirname, 'commands');
		const commandFiles = getCommandFiles();

		for (const file of commandFiles) {
			const filePath = path.join(rootPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				this.commands.set(command.data.name, command)
			}
		}
	}
	registerCommands(guild: Guild) {
		this.commands.forEach((command) => {
			guild.commands?.create(command.data)
		})

	}
}

function getCommandFiles(commandPath: string = ""): Array<string> {
	const directory = path.join(__dirname, 'commands') + "/" + commandPath
	const files = fs.readdirSync(directory);
	let commands: Array<string> = [];

	for (const file of files) {
		if (file.substring(file.length - 3) == ".ts") {
			commands.push(commandPath + "/" + file);
		} else {
			commands = commands.concat(getCommandFiles(file))
		}
	}

	return commands;
}
