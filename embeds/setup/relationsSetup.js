const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRelationsSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑹𝒆𝒍𝒂𝒕𝒊𝒐𝒏𝒔')
        .setDescription(`
          Please click the following button/s based on what assistance you require from the <:RelationsTeam:1279572725500743710> Relations Team:

            <:00pinkstar:1283815198137913404> __𝑷𝒂𝒓𝒕𝒏𝒆𝒓𝒔𝒉𝒊𝒑𝒔__
            Open a **partnerships** ticket if you would like to form a partnership between Pinecrest and the server you're representing.
            *Our partnership requirements can be found in <#1270004249794969611>!*

            <a:2smallflowers:1311063053646692454> __𝑴𝒆𝒎𝒃𝒆𝒓 𝑺𝒑𝒐𝒕𝒍𝒊𝒈𝒉𝒕__
            Open a **member spotlight** ticket if you'd like to nominate a server member for our monthly spotlight.
            *Please note that you cannot nominate yourself.*

            <a:2pinkflowers:1274490876642721904> __𝑺𝒆𝒓𝒗𝒆𝒓 𝑭𝒆𝒆𝒅𝒃𝒂𝒄𝒌__
            Open a **server feedback** ticket if you would like to submit feedback for any aspect of the server.

            <:2koifish:1285760530975555605> __𝑩𝒐𝒐𝒔𝒕𝒆𝒓 𝑹𝒐𝒍𝒆__
            Open a **booster role** ticket if you would like to claim or alter your booster role from boosting the server.
        `)
        .setColor(0xDA95B1)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712201724035112/Copy_of_Copy_of_Untitled_Design_4.png?ex=683d994c&is=683c47cc&hm=55989ebd79657ab43bb5157d722a3b1c938ebf7ded82c4f1b142bc4df3d23155&=&format=webp&quality=lossless');

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-relations_partnership')
            .setLabel('Partnerships')
            .setEmoji('1283815198137913404')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-relations_spotlight')
            .setLabel('Member Spotlight')
            .setEmoji('1311063053646692454')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-relations_feedback')
            .setLabel('Server Feedback')
            .setEmoji('1274490876642721904')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-relations_booster')
            .setLabel('Booster Role')
            .setEmoji('1285760530975555605')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [buttons] };
}

module.exports = { createRelationsSetupEmbed };