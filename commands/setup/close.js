const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Closes the current ticket')
        .setDMPermission(false),

    async execute(interaction) {
        const channel = interaction.channel;

        if (!channel.name.includes('-') || !channel.parent) {
            return interaction.reply({ content: 'This command cannot be ran outside of a ticket', flags: 64 });
        }

        const confirmRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('confirm-close')
                .setLabel('Confirm Close')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('cancel-close')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({
            content: 'Are you sure you want to close this ticket?',
            components: [confirmRow],
            ephemeral: true
        });
    }
};