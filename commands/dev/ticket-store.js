const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const Store = require('../../db/store');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-store')
        .setDescription('Check Pinebot ticket status')
        .addSubcommand(s =>
            s.setName('status')
             .setDescription('Show current DB health and next ticket number')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            const current = Store.nextTicketNumber();
            const lastIssued = current - 1;

            const embed = new EmbedBuilder()
                .setTitle('Ticket Store Status')
                .setColor(0x57F287)
                .addFields(
                    { name: 'Database', value: 'SQLite OK', inline: true },
                    { name: 'Last Ticket #', value: String(lastIssued), inline: true },
                    { name: 'Next Ticket #', value: String(current), inline: true }
                )
                .setFooter({ text: 'Pinebot DB HealthCheck' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], flags: 64 });
        } catch (err) {
            console.error('Ticket-store status error:', err);
            await interaction.reply({ content: 'Could not read from SQLite ticket store.', flags: 64 });
        }
    }
};