const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createServerFeedbackEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑺𝒆𝒓𝒗𝒆𝒓 𝑭𝒆𝒆𝒅𝒃𝒂𝒄𝒌')
        .setDescription(`
            Thank you for opening a **server feedback** ticket! Please send us your feedback and a member of the <:RelationsTeam:1279572725500743710> **Relations Team** will respond as soon as possible!
        `)
        .setColor(0xDA95B1)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712247244689458/thing_9.png?ex=683d9956&is=683c47d6&hm=cf27ee0ab64f06bbd73326f29a92698749e57ba8617b3bb869f1d5c7371c4dbe&=&format=webp&quality=lossless')

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

module.exports = { createServerFeedbackEmbed };