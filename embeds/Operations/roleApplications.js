const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRoleApplicationsEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setDescription(`
            Thank you for applying for a role in Pinecrest, an Operations Admin will be with you ASAP.

            **Requirements for character intro**:

            Likes & dislikes: If it's a list, there must be five things or more. If it's not a list, and more of a description, please make sure it has three sentences or more. 

            Hobbies: Same thing as likes and dislikes, if it's a list, there should be 5+ things. If not, it should be 3+ sentences. 

            About Me: Your about me section needs to have at least four sentences or more. 

            **If you have any questions, please feel free to ping the operations admin handling your ticket! <3**
        `)
        .setColor(0x6AB5C8)

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

module.exports = { createRoleApplicationsEmbed };