const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createFamilyApplicationEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑭𝒂𝒎𝒊𝒍𝒚 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏𝒔')
        .setDescription(`
            Thank you for opening a **family applications** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Family Name:**
            **Family Nationality/s:**
            **Number of Roles wanted:**
            *The maximum number of roles per family is 10.*
            **List of Roles (Include names, ages and familial roles e.g., father):**
            - _ _
            **Do you have a plot for your family to use?:**
            **Are you willing to be the Head of Family?:**
            **Are you willing to write lore and storylines for your family?:**
            - _ _
            **Please list a minimum of three people who will be joining your family (Discord Usernames & IDs):**
            - _ _
            **Please write an example of the lore for this family (At least one paragraph):**

            ═══════════════════

            A member of the <:Owners:1279553143486677003> **Ownership Team** will respond soon.
        `)
        .setColor(0xB95B5B)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712282720374864/thing_17.png?ex=683d995f&is=683c47df&hm=5ebd89cbed1f8fff108da2bd999651a66de051684bb8f1b19ae26611840a8bc6&=&format=webp&quality=lossless')

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

module.exports = { createFamilyApplicationEmbed };