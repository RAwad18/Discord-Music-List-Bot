//imports stuff (lol)
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

//registers the commands via the SlashCommandBuilder from discord.js (wow! very descriptive!)
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());  //not sure what this does

const rest = new REST({ version: '10' }).setToken(token);   //or this

//decides the route in the script
//makes it so the above commands only work in the specified guildID
//see the official discord.js documentation on how to make commands global
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);