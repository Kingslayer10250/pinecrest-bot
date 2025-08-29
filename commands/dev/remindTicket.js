const { SlashCommandBuilder } = require('discord.js');
const { sendTicketReminder } = require('../../scheduler/ticketReminder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remindtickets')
        .setDescription('Manually sends the ticket summary.'),

    async execute(interaction) {
        const allowedUserId = '968999850203050014';
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({ content: 'This command is in beta testing and may only be used by the Developer.', flags: 64 });
        }

        await interaction.reply('Checking for open tickets...');

        const success = await sendTicketReminder(interaction.client, interaction.channel.id);

        if (!success) {
            await interaction.followUp('Not enough open tickets to send a summary.. (must be 10+ open tickets in total).');
        } else {
            await interaction.followUp('Ticket summary sent!');
        }
    },
};