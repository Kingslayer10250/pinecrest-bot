const { SlashCommandBuilder } = require('discord.js');
const devUsers = require('../../devUsers');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Make Pinebot echo')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Content')
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!devUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: 'You do not have permission to use this command', flags: 64 });
        }

        const message = interaction.options.getString('message');

        await interaction.reply({ content: 'Message sent', flags: 64 });
        await interaction.channel.send(message);
    }
};