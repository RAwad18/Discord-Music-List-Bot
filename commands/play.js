const { SlashCommandBuilder, Client, ClientUser } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus, AudioPlayer } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays audio.'),
	async execute(interaction) {

		if (!interaction.member.voice.channel) {
			await interaction.reply(`Error! You must be connected to a voice channel first.`)
			return;
		}
		// else if(Client.voice.connections.size > 0){
		// 	await interaction.reply(`I am not in a VC!`);
		// }
		else {
			// interaction.user is the object representing the User who ran the command
			// interaction.member is the GuildMember object, which represents the user in the specific guild
			await interaction.reply(`Good Job! You have played me.`);

			const connection = joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});

			console.log("interaction.guild.id:	"+interaction.guild.id);
			console.log("interaction.guildId:	"+interaction.guildId);
			// const trackConnection = getVoiceConnection();
			// console.log(typeof trackConnection);
			// console.log("User's Voice Channel ID: " + interaction.member.voice.channel.id);
			// console.log("Bot's Voice Channel ID: " + client.voiceConnections.get(GuildID).channel.id);
		}
	},
};