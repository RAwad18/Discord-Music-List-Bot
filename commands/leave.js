const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Disconnects Bot from VC.'),
    async execute(interaction) {
        await interaction.reply('Bot has left the chat');
        const connection = getVoiceConnection(interaction.guildId);
        console.log(connection.joinConfig.channelId);
        connection.destroy();
    },
};