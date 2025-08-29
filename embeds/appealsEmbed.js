const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createappealsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('Ban Appeals Ticket')
        .setDescription(`Welcome, a member of Staffing will be with you shortly!`)
        .setColor(0xB95B5B)

    const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('close-ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger),
    );

    return { embed, components: [closeButton] };
}

module.exports = { createappealsEmbed };