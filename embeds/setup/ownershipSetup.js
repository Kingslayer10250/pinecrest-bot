const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createOwnershipSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑶𝒘𝒏𝒆𝒓𝒔𝒉𝒊𝒑')
        .setDescription(`
            <a:2bunnyclapping:1290731640233918557> __𝑹𝒆𝒑𝒐𝒓𝒕 𝒂𝒏 𝑨𝒅𝒎𝒊𝒏__
            Open a **report an admin** ticket if you need to report an admin for any of the following:
            • Abusing admin permissions.
            • Breaking server rules.

            <a:2butterflieswhite:1283814937634017404> __𝑨𝒄𝒕𝒊𝒗𝒊𝒕𝒚 𝑺𝒕𝒓𝒊𝒌𝒆 𝑨𝒑𝒑𝒆𝒂𝒍__
            Open an **activity strike appeal** ticket if you would like to appeal a strike you received for not reacting to an activity check.

            <a:2flowersandpetals:1338967651950530621> __𝑨𝒅𝒎𝒊𝒏 𝑨𝒑𝒑𝒆𝒂𝒍𝒔__
            Open an **admin appeals** ticket if you want to appeal any of the following:
            • Appealing an admin disciplinary.
            • Appealing an admin blacklist.
            *Please note you will not be told if you are admin blacklisted. If you want to ask, please open this ticket.*

            <:2plant:1342970801233592421> __𝑭𝒂𝒎𝒊𝒍𝒚 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏𝒔__
            Open a **family applications** ticket if you would like to apply to have your own family listed in Pinecrest officially. You must have a minimum of **three people** *(including yourself)* that are willing to be in your family for us to consider accepting your application.
            *We have a maximum limit of 12 families in Pinecrest, we will only add new families if we are under the limit.*

            <:2pinetrees:1338970190368477325> __𝑶𝒕𝒉𝒆𝒓__
            Open an **other** ticket if you cannot find any ticket opener for the issue you have.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712201363197982/Copy_of_Copy_of_Untitled_Design_5.png?ex=683d994c&is=683c47cc&hm=8e441043a7a970a67d27b20ff97c4c38c325dc656aca5fac6b876badc0ac351a&=&format=webp&quality=lossless');

    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-owner_reportadmin')
            .setLabel('Report an Admin')
            .setEmoji('1290731640233918557')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-owner_activityappeal')
            .setLabel('Activity Strike Appeal')
            .setEmoji('1283814937634017404')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-owner_adminappeal')
            .setLabel('Admin Appeals')
            .setEmoji('1338967651950530621')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-owner_famapps')
            .setLabel('Family Applications')
            .setEmoji('1342970801233592421')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-owner_other')
            .setLabel('Other')
            .setEmoji('1338970190368477325')
            .setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-owner_complaints')
            .setLabel('Complaints')
            .setEmoji('1285760550860750858')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-owner_activitywaiver')
            .setLabel('Activity Waiver')
            .setEmoji('1342970800269164585')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [row1, row2] };
}

module.exports = { createOwnershipSetupEmbed };