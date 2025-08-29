const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createReportUserEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑹𝒆𝒑𝒐𝒓𝒕 𝒂 𝑼𝒔𝒆𝒓')
        .setDescription(`
            Thank you for opening a **report a user** ticket! Please tell us who you are reporting and why, a member of the <:StaffingTeam:1279554228653789265> **Staffing** Team will respond as soon as possible.
            *Please provide as much evidence as possible, more evidence makes it easier for us to punish rule breakers.*
        `)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712264969818194/thing_12.png?ex=683d995b&is=683c47db&hm=fb410544023f90736ce67c5e95ad311bd54de9f3ff64da519e298c3792f84587&=&format=webp&quality=lossless')

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

module.exports = { createReportUserEmbed };