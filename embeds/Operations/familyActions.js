const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createFamilyActionsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑭𝒂𝒎𝒊𝒍𝒚 𝑨𝒄𝒕𝒊𝒐𝒏𝒔')
        .setDescription(`
            Thank you for opening a **family actions** ticket! While you're waiting for a response, please fill out the template for the action you wish to complete;

            ════__𝑨𝒍𝒍𝒊𝒂𝒏𝒄𝒆/𝑹𝒊𝒗𝒂𝒍𝒓𝒚__════

            **Your Family:**
            **What action you want to take (Ally/Rival):**
            **Which family is involved?:**
            **Why do you want to take this action?:**

            ═════__𝑹𝒐𝒍𝒆 𝑹𝒆𝒎𝒐𝒗𝒂𝒍__═════

            **Your Family:**
            **Which role is being removed?:**
            **Reason for removal:**

            ═════__𝑹𝒐𝒍𝒆 𝑨𝒅𝒅𝒊𝒕𝒊𝒐𝒏__═════

            **Your Family:**
            **New Role Name:**
            **New Role Age:**
            **New Role Nationality(s):**
            **Type of Role:**
            **Reason for adding:**

            ══__𝑹𝒆𝒎𝒐𝒗𝒆 𝒇𝒓𝒐𝒎 𝑭𝒂𝒎𝒊𝒍𝒚__══

            **Your Family:**
            **Who you want to remove:**
            **Reason:**
            > *If you're removing someone from your family due to rule breaking, please also report them in the appropriate reports ticket.*

            ═══════════════════

            A member of the <:OperationsTeam:1279554390231093339> **Operations Team** will respond soon.
        `)
        .setColor(0x6AB5C8)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712230429851658/thing_3.png?ex=683d9952&is=683c47d2&hm=6345d5e3fab1057376b76f08270c21c7556e6ece306d6f3443f9eb27b9ae49f8&=&format=webp&quality=lossless')

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

module.exports = { createFamilyActionsEmbed };