const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createOtherEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑶𝒕𝒉𝒆𝒓')
        .setDescription(`
            Thank you for opening an **other** ticket! Please let us know what you need assistance with, a member of the <:Owners:1279553143486677003> **Ownership Team** will respond soon.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712282191761408/thing_19.png?ex=683d995f&is=683c47df&hm=8ce6f9eb4d4f0893772b3362678a46c1bbbb7377c3d219565858fb4706cc6338&=&format=webp&quality=lossless')

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

module.exports = { createOtherEmbed };