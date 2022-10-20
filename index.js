const fs = require('node:fs');	//The fs module is Node's native file system module. fs is used to read the commands directory and identify our command files.
const path = require('node:path'); //The path module is Node's native path utility module. path helps construct paths to access files and directories.
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); // Require the necessary discord.js classes
const { token } = require('./config.json');     //retrieves token (i think lol)

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//The Collection class extends JavaScript's native Map class, and includes more extensive, useful functionality. 
//Collection is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');	//path.join() helps to construct a path to the commands directory.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));	//fs.readdirSync() method then reads the path to the directory and returns an array of all the file names it contains

//With the correct files identified, the last step is to loop over the array and dynamically set each command into the client.commands Collection. 
//For each file being loaded, check that it has at least the data and execute properties. 
//This helps to prevent errors resulting from loading empty, unfinished or otherwise incorrect command files while you're still developing.
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Login to Discord with your client's token
client.login(token);