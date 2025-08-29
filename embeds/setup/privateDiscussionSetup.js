const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createPrivateOpsSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('Start a Private Discussion')
        .setDescription('Open a private ticket with a member of your choice. Remember to use the adduser slash command!')
        .setColor(0x5865F2);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('open-private-ops')
            .setLabel('Open a Private Ticket')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [row] };
}

module.exports = { createPrivateOpsSetupEmbed };