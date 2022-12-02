const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays audio.'),
	async execute(interaction) {

		if (!interaction.member.voice.channel.id.length) {
			await interaction.reply(`Error! You must be connected to a voice channel first.`)
		} else {
			// interaction.user is the object representing the User who ran the command
			// interaction.member is the GuildMember object, which represents the user in the specific guild
			await interaction.reply(`Good Job! You have played me.`);

			const connection = joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
		}


		console.log(interaction.member.voice.channel.id);
	},
};