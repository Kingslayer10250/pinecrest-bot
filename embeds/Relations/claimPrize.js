const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createMemberSpotlightEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑷𝒐𝒊𝒏𝒕𝒔/𝑪𝒍𝒂𝒊𝒎 𝑷𝒓𝒊𝒛𝒆')
        .setDescription(`
            Thank you for opening a **points/claim prize** ticket! If you're here to ask about points, please ask your question and wait for an admin to respond. If you're here to claim a prize with your points, please fill out the following template;

            ═══════════════════

            **Your Discord Username:**
            **Your Discord ID:**
            **Which prize are you claiming?:**
            *Please remember you can only claim one prize per month!*

            ═══════════════════

            A member of the <:RelationsTeam:1279572725500743710> **Relations Team** will respond soon.
        `)
        .setColor(0xDA95B1)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712247588618250/thing_8.png?ex=683d9957&is=683c47d7&hm=4c0661df37c9eadd919e0dbe41c6eab0bbd27b8f9e19038b8e485a4fd176a23e&=&format=webp&quality=lossless')

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

module.exports = { createclaimPrizeEmbed };