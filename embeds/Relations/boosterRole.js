const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createBoosterRoleEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑩𝒐𝒐𝒔𝒕𝒆𝒓 𝑹𝒐𝒍𝒆')
        .setDescription(`
           Thank you for opening a **booster role** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Hex (Colour code):**
            **Role Name:**
            **Emoji Chosen:**
            
            *If the emoji you want isn't in the server, please send it as a PNG file with no background.*



            ═══════════════════

            A member of the <:RelationsTeam:1279572725500743710> **Relations Team** will respond soon.
        `)
        .setColor(0xDA95B1)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712246875586610/thing_10.png?ex=683d9956&is=683c47d6&hm=2bcd7ed4f5cc311b1d297841bde738ff8be963baa1a7bafa0be035abf7be78d6&=&format=webp&quality=lossless')

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

module.exports = { createBoosterRoleEmbed };