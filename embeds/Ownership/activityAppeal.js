const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createActivityAppealEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑨𝒄𝒕𝒊𝒗𝒊𝒕𝒚 𝑺𝒕𝒓𝒊𝒌𝒆 𝑨𝒑𝒑𝒆𝒂𝒍')
        .setDescription(`
           Thank you for opening a **activity strike appeal** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Role Name:**
            **Strike(s) Appealing:**
            **Reason for not reacting to the activity check(s):**

            ═══════════════════

            A member of the <:Owners:1279553143486677003> **Ownership Team** will respond soon.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712282967707658/thing_16.png?ex=683d995f&is=683c47df&hm=3159a6b572bd72b0f17b85abf713968d8ce637ddb117e5e644c6472d841538f1&=&format=webp&quality=lossless')

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

module.exports = { createActivityAppealEmbed };