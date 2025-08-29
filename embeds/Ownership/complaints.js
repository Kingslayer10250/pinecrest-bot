const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createComplaintsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑪𝒐𝒎𝒑𝒍𝒂𝒊𝒏𝒕𝒔')
        .setDescription(`
            Thank you for opening a **complaints** ticket! Please provide as much information regarding your complaint, and our **Complaints Manager** will respond ASAP.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1387031893102428200/thing_20.png?ex=685bdd9d&is=685a8c1d&hm=a6d981236adbce9a6ce36cf9b9a87cd204a7efe165a435bd6d7110f9b6e495b8&=&format=webp&quality=lossless')

    const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('close-ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('claim-ticket')
            .setLabel('Claim Ticket')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [closeButton] };
}

module.exports = { createComplaintsEmbed };