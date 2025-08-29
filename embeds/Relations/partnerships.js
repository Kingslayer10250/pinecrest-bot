const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createPartnershipsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑷𝒂𝒓𝒕𝒏𝒆𝒓𝒔𝒉𝒊𝒑𝒔')
        .setDescription(`
           Thank you for opening a **partnerships** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Your Discord username:**
            **Your Discord ID:**
            **Your Servers Name:**
            **Do you meet all of our requirements?:**
            -# Our requirements can be found in <#1270004249794969611>.
            **Will you be representing your server?:**

            ═══════════════════

            A member of the <:RelationsTeam:1279572725500743710> **Relations Team** will respond soon.
        `)
        .setColor(0xDA95B1)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712247928619038/thing_7.png?ex=683d9957&is=683c47d7&hm=56227cd351e1c662867dac3bded98587b29dc07069eb83dc637c2b65753dc8fc&=&format=webp&quality=lossless')

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

module.exports = { createPartnershipsEmbed };