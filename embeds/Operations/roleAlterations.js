const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRoleAlterationsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑹𝒐𝒍𝒆 𝑨𝒍𝒕𝒆𝒓𝒂𝒕𝒊𝒐𝒏𝒔')
        .setDescription(`
           Thank you for opening a **role alterations** ticket! While you're waiting for a response, please fill out the template for the action you wish to complete;
            > *All role alterations EXCEPT role switches need to be approved by your Head of Family.*

            ══════__𝑺𝒘𝒊𝒕𝒄𝒉 𝑹𝒐𝒍𝒆__══════

            **Current Role:**
            **Switching to:**
            **Reason:**

            ════__𝑮𝒆𝒏𝒅𝒆𝒓 𝑪𝒉𝒂𝒏𝒈𝒆__════

            **Role Name:**
            **Your roles current gender:**
            **Gender switching to:**
            **Reason:**

            ══════__𝑨𝒈𝒆 𝑪𝒉𝒂𝒏𝒈𝒆__══════

            **Role Name:**
            **Your roles current age:**
            **Age switching to:**
            **Reason:**

            ═════__𝑵𝒂𝒎𝒆 𝑪𝒉𝒂𝒏𝒈𝒆__═════

            **Current Role Name**
            **Name Switching to:**
            **Reason:**
            -# Please note you cannot change your characters family name.

            ═══════════════════

            A member of the <:OperationsTeam:1279554390231093339> **Operations Team** will respond soon.
        `)
        .setColor(0x6AB5C8)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712230190645258/thing_4.png?ex=683d9952&is=683c47d2&hm=9834a1eea2df5cb551c5d16a4392f099c8001b2392ddfe0be3a5335cc83b6509&=&format=webp&quality=lossless')

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

module.exports = { createRoleAlterationsEmbed };