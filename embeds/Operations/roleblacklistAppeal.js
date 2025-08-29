const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRoleBlacklistAppealEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑹𝒐𝒍𝒆 𝑩𝒍𝒂𝒄𝒌𝒍𝒊𝒔𝒕 𝑨𝒑𝒑𝒆𝒂𝒍𝒔')
        .setDescription(`
           Thank you for opening a **family actions** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Discord username:**
            **Discord ID:**
            **Reason for appealing role blacklist:**

            ═══════════════════

            A member of the <:OperationsTeam:1279554390231093339> **Operations Team** will respond soon.
        `)
        .setColor(0x6AB5C8)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712229679071353/thing_6.png?ex=683d9952&is=683c47d2&hm=14f1dd33a544f88f5cc82343caed79a119cd6e37149ba9f3cddb9f90d0aaccba&=&format=webp&quality=lossless')

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

module.exports = { createRoleBlacklistAppealEmbed };