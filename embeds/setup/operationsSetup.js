const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createOperationsSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑶𝒑𝒆𝒓𝒂𝒕𝒊𝒐𝒏𝒔')
        .setDescription(`
            Please click the following button/s based on what assistance you require from the <:OperationsTeam:1279554390231093339> **Operations Team**:

            <:006bluestar:1283815189451505674> __𝑭𝒂𝒎𝒊𝒍𝒚 𝑨𝒄𝒕𝒊𝒐𝒏𝒔__
            Open a **family actions** ticket to do the following:
            • Form an alliance/rivalry with another family.
            • Remove/Add a role to your family.
            • Remove someone from your family.
            *Head of Family ONLY.*

            <a:2blueflowers:1274491094964371466> __𝑹𝒐𝒍𝒆 𝑨𝒍𝒕𝒆𝒓𝒂𝒕𝒊𝒐𝒏𝒔__
            Open a **role alterations** ticket to make changes to your character (i.e., changing characters gender, name or age) or to switch to another role.
            *Changing your character requires approval from your Head of Family.*

            <:2blueballoonflower:1285760538349142025> __𝑭𝒊𝒏𝒅 𝒂 𝑹𝒐𝒍𝒆__
            Open a **find a role** ticket if you're having trouble finding a role that fits what you're looking for.
            *If we cannot find a role suited to you, we will recommend you apply for a side character.*

            <:9tropicalblueflower:1374099749287755848> __𝑹𝒐𝒍𝒆 𝑩𝒍𝒂𝒄𝒌𝒍𝒊𝒔𝒕 𝑨𝒑𝒑𝒆𝒂𝒍𝒔__
            Open a **role blacklist appeals** ticket if you want to appeal your role blacklist due to;
            • Not attending 2+ sessions in a month.
            *OR...*
            • Not reacting to the activity check 3x in a month.
            *You can only appeal your first blacklist; a second role blacklist is permanent!*
        `)
        .setColor(0x6AB5C8)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712202105589830/Copy_of_Copy_of_Untitled_Design_3.png?ex=683d994c&is=683c47cc&hm=445195b8d3c8413427af48f5aa3a5cbbe463f683bb58d0f59222198cf119ff2c&=&format=webp&quality=lossless');

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-operations_famactions')
            .setLabel('Family Actions')
            .setEmoji('1283815189451505674')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-operations_rolealterations')
            .setLabel('Role Alterations')
            .setEmoji('1274491094964371466')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-operations_findrole')
            .setLabel('Find a Role')
            .setEmoji('1285760538349142025')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-operations_roleappeal')
            .setLabel('Role Blacklist Appeals')
            .setEmoji('1374099749287755848')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [buttons] };
}

module.exports = { createOperationsSetupEmbed };