const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createRoleApplicationsSetupEmbed() {
    const embed = new EmbedBuilder()
        .setTitle('Apply for a Role!')
        .setDescription(`
            Before clicking on the application button, please make sure you have a chosen character to apply for in <#1269851185024729109> so you are ready to out your application. Once you have opened a ticket, you will need to fill out a **Character Intro** form which an <:3OperationsTeam:1279554390231093339> **Operations Admin** will review as soon as one is available.

            __**What is required in your application:**__
            
            * A faceclaim (e.g, AI or a real person). 
            * Detail. If you're confused or are not sure how much detail to include, you can ask the Operations Admin handling your ticket. 
            * The correct character information. Make sure your age, gender and name are correct, and for parents please make sure your occupation aligns with your families lore.

        `)
        .setColor(0x6AB5C8);

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ticket-operations_roleapp')
            .setLabel('Click to Apply!')
            .setEmoji('👤')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [buttons] };
}

module.exports = { createRoleApplicationsSetupEmbed };