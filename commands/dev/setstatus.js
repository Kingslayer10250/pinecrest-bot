const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const activityTypes = {
    Playing: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Competing: 5
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('customstatus')
        .setDescription('Change PineBots Status')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of status')
                .setRequired(true)
                .addChoices(
                    { name: 'Playing', value: 'Playing' },
                    { name: 'Watching', value: 'Watching' },
                    { name: 'Listening', value: 'Listening' },
                    { name: 'Competing', value: 'Competing' }
            ))
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Status text to display')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const text = interaction.options.getString('text');

        try {
            await interaction.client.user.setPresence({
                activities: [{ name: text, type: activityTypes[type] }],
                status: 'online'
            });

            await interaction.reply({ content: `Status updated to **${type} ${text}**`, flags: 64 });
        } catch (err) {
            console.error('Failed to set status:', err);
            await interaction.reply({ content: 'Failed to update status. Check logs for more information.', flags: 64 });
        }
    }
};