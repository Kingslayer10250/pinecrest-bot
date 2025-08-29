const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createStaffingSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑺𝒕𝒂𝒇𝒇𝒊𝒏𝒈')
        .setDescription(`
            Please click the following button/s based on what assistance you require from the <:StaffingTeam:1279554228653789265> Staffing Team:

            <:007purplestar:1283815191368175746> __𝑯𝒐𝑭 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏__
            Open a **HoF application** ticket if you would like to be the Head of Family for your current family!
            *The limit for HoF per family is currently 1, decent activity is required.*

            <:2violet:1285760529809539163> __𝑹𝒆𝒑𝒐𝒓𝒕 𝒂 𝑼𝒔𝒆𝒓__
            Open a **report a user** ticket if you would like to report another user for rule breaking.
            *Please provide evidence if possible, it's harder for us to punish rule breakers without evidence.*

            <a:9happyseal:1374099872466210826> __𝑹𝒆𝒒𝒖𝒆𝒔𝒕 𝑰𝑵__
            Open a **request IN** ticket if you're going to be unavailable for 3+ days.
            *Admins ONLY, you can go on an IN for up to 1 week per month.*

            <:2whitelily:1285760550860750858> __𝑺𝒕𝒓𝒊𝒌𝒆/𝑫𝒆𝒎𝒐𝒕𝒊𝒐𝒏 𝑨𝒑𝒑𝒆𝒂𝒍𝒔__
            Open a **strike/demotion appeals** ticket if you would like to appeal a strike you have received if you were demoted from **Helper** or removed from **Head of Family**.
            *You cannot appeal a verbal warning or a timeout.*
        `)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712202877468804/Copy_of_Copy_of_Untitled_Design_2.png?ex=683d994c&is=683c47cc&hm=b904f608c85a0ea59de17ea9bfb45e5d1e08c22d1fee7fea741f357542c8056d&=&format=webp&quality=lossless');

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-staffing_hofapp')
            .setLabel('HoF Application')
            .setEmoji('1283815191368175746')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-staffing_reportuser')
            .setLabel('Report a User')
            .setEmoji('1285760529809539163')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-staffing_requestin')
            .setLabel('Request IN')
            .setEmoji('1374099872466210826')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('ticket-staffing_strikeappeal')
            .setLabel('Strike/Demotion Appeals')
            .setEmoji('1285760550860750858')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [buttons] };
}

module.exports = { createStaffingSetupEmbed };