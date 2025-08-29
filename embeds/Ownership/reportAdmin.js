const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createReportAdminEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑹𝒆𝒑𝒐𝒓𝒕 𝒂𝒏 𝑨𝒅𝒎𝒊𝒏')
        .setDescription(`
            Thank you for opening a **report an admin** ticket! Please provide as much detail and evidence as possible. This makes it easier for us to deal with rule breaking/rank abusing behaviour. A member of the <:Owners:1279553143486677003> **Ownership Team** will respond as soon as possible.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712283210842183/thing_15.png?ex=683d995f&is=683c47df&hm=e52664750818c2c49916fb31953777b07f077c14c6ba24c45f9c204c8d0e7ce3&=&format=webp&quality=lossless')

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

module.exports = { createReportAdminEmbed };