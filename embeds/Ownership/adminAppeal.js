const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createAdminAppealEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑨𝒅𝒎𝒊𝒏 𝑨𝒑𝒑𝒆𝒂𝒍𝒔')
        .setDescription(`
           Thank you for opening an **admin appeals** ticket! While you're waiting for a response, please fill out the template for the action you wish to complete;

            ═════__𝑺𝒕𝒓𝒊𝒌𝒆 𝑨𝒑𝒑𝒆𝒂𝒍__═════

            **Discord Username:**
            **Discord ID:**
            **Team:**
            **Reason for strike:**
            **Reason for appeal:**

            ════__𝑫𝒆𝒎𝒐𝒕𝒊𝒐𝒏 𝑨𝒑𝒑𝒆𝒂𝒍__════

            **Discord Username:**
            **Discord ID:**
            **Team:**
            **Rank before demotion:**
            **Reason for demotion:**
            **Reason for appeal:**

            ═══__𝑻𝒆𝒓𝒎𝒊𝒏𝒂𝒕𝒊𝒐𝒏 𝑨𝒑𝒑𝒆𝒂𝒍__═══

            **Discord Username:**
            **Discord ID:**
            **Rank before termination:**
            **Reason for termination:**
            **Reason for appeal:**

            ════__𝑩𝒍𝒂𝒄𝒌𝒍𝒊𝒔𝒕 𝑨𝒑𝒑𝒆𝒂𝒍__════

            **Discord Username:**
            **Discord ID:**
            **Reason for appeal:**
            *If you aren't sure whether or not you're blacklisted, ask before filling out the template.*

            ═══════════════════

            A member of the <:Owners:1279553143486677003> **Ownership Team** will respond soon.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712282418118738/thing_18.png?ex=683d995f&is=683c47df&hm=53541a4dea37f1427ba26083f28cbaa8578d9a7c1f4d6c57e1a16112c70ced74&=&format=webp&quality=lossless')

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

module.exports = { createAdminAppealEmbed };