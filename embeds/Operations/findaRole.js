const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createFindARoleEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑭𝒊𝒏𝒅 𝒂 𝑹𝒐𝒍𝒆')
        .setDescription(`
            Thank you for opening a **find a role** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Gender:**
            **Age:**
            **Ethnicity:**
            **Extra:**
            -# Fill out the form with your preferences and we'll try to find roles accordingly!

            ═══════════════════

            A member of the <:OperationsTeam:1279554390231093339> **Operations Team** will respond soon.
        `)
        .setColor(0x6AB5C8)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712229947641998/thing_5.png?ex=683d9952&is=683c47d2&hm=161d7043adeaf140136d452938484ae095475d1a2ae09ec03db38e5d2e7495b3&=&format=webp&quality=lossless')

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

module.exports = { createFindARoleEmbed };