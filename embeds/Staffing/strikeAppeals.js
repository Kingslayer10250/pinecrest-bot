const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createStrikeAppealEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑺𝒕𝒓𝒊𝒌𝒆/𝑫𝒆𝒎𝒐𝒕𝒊𝒐𝒏 𝑨𝒑𝒑𝒆𝒂𝒍𝒔')
        .setDescription(`
            Thank you for opening a **strike/demotion appeals** ticket! While you're waiting for a response, please fill out the template for the action you wish to complete;

            ═════__𝑺𝒕𝒓𝒊𝒌𝒆 𝑨𝒑𝒑𝒆𝒂𝒍__═════

            **Discord Username:**
            **Discord ID:**
            **Reason for Strike:**
            **Reason for appeal:**

            ════__𝑫𝒆𝒎𝒐𝒕𝒊𝒐𝒏 𝑨𝒑𝒑𝒆𝒂𝒍__════

            **Discord Username:**
            **Discord ID:**
            **Rank before Demotion:**
            **Reason for Demotion:**
            **Reason for appeal:**

            ═══════════════════

            A member of the <:StaffingTeam:1279554228653789265> **Staffing Team** will respond soon.
        `)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712264269369415/thing_14.png?ex=683d995b&is=683c47db&hm=8a7f8355ff559ed97d0ba87cbe0a76014bbcd7de5afd89da94b6562381bb3ba8&=&format=webp&quality=lossless')

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

module.exports = { createStrikeAppealEmbed };