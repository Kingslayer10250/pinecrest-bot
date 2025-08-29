const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createPrivateDiscussionEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('Private Discussion Ticket')
        .setDescription(`Welcome! This ticket has been created to allow a  private conversation with the Admin Team.`)
        .setColor(0xB95B5B)

    const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('close-ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger),
    );

    return { embed, components: [closeButton] };
}

module.exports = { createPrivateDiscussionEmbed };