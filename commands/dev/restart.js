const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the bot -- DEV ONLY'),

    async execute(interaction) {
        const allowedUsers = ['968999850203050014', '394136807769636864'];
        if (!allowedUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: 'You do not have permission to restart me.', flags: 64 });
        }

        await interaction.reply({ content: 'Restarting PineBot...'});
        console.log(`PineBot restarted by ${interaction.user.tag}`);
        process.exit(0);
    }
};