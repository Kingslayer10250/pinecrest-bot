const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRequestINEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑹𝒆𝒒𝒖𝒆𝒔𝒕 𝑰𝑵')
        .setDescription(`
            Thank you for opening a **request an IN** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Discord username:**
            **Discord ID:**
            **How long will you be on IN?:**
            **Reason?:**
            *Only apply for an IN if you're going to be inactive for 3+ days. You only get one IN per month, don't waste it on a couple of days!*

            ═══════════════════

            A member of the <:StaffingTeam:1279554228653789265> **Staffing Team** will respond soon.
        `)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712264592593018/thing_13.png?ex=683d995b&is=683c47db&hm=b3607f78e6dcdf3e9181149c50a940bdd37cf103cb9b34fab6efe48d34f2a590&=&format=webp&quality=lossless')

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

module.exports = { createRequestINEmbed };