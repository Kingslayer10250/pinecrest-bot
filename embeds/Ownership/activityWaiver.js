const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createActivityWaiverEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑨𝒄𝒕𝒊𝒗𝒊𝒕𝒚 𝑾𝒂𝒊𝒗𝒆𝒓')
        .setDescription(`
            Thank you for opening an **activity waiver** ticket, please fill out the form below. Once completed, a **Server Manager** will respond ASAP.

            ═══════════════════

            **Discord Username:**
            **Discord ID:**
            **Roleplay Name:**
            **Reason for applying:**

            ═══════════════════

            Please let us know if you have any questions.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1389332009616146472/thing_21.png?ex=68643bc3&is=6862ea43&hm=284a0d48999b0d6139e598d0dc86bb8273fa8c8cddfec7e16eb052efa1fc844f&=&format=webp&quality=lossless')

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

module.exports = { createActivityWaiverEmbed };