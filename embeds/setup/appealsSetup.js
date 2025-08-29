const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createappealsSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('Appeals')
        .setDescription(`Open a ticket to appeal a ban from the main Pinecrest server. A member of Staffing will respond shortly.`)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712202877468804/Copy_of_Copy_of_Untitled_Design_2.png?ex=683d994c&is=683c47cc&hm=b904f608c85a0ea59de17ea9bfb45e5d1e08c22d1fee7fea741f357542c8056d&=&format=webp&quality=lossless');

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-appeals_ban')
            .setLabel('Open an Appeal Ticket')
            .setEmoji('1374099749287755848')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [buttons] };
}

module.exports = { createappealsSetupEmbed };