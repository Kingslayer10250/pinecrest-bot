const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unclaim')
        .setDescription('Unclaim a claimed ticket')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;
        const allowedRoles = ['1269768427925405837', '1311069586522640394', '1370206192101752974', '1283865189778980934', '1269768428516806686', '1340771352923213865'];
        const hasAccess = interaction.member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasAccess) {
            return interaction.reply({ content: 'You do not have permission to use this command', flags: 64 });
        }

        if (!channel.name.match(/^[a-z]+-[a-z0-9]+-\d{3}$/)) {
            return interaction.reply({ content: 'This command can only be used inside a ticket', flags: 64 });
        }

        await channel.setTopic(null).catch(() => {});

        let messageWithClaim;
        try {
            const messages = await channel.messages.fetch({ limit: 20 });
            messageWithClaim = messages.find(msg =>
                msg.components?.some(row => 
                    row.components.some(comp => comp.customId === 'claim-ticket' || comp.customId === 'unclaim-ticket')
                )
            );
        } catch (err) {
            console.error('Error fetching messages:', err);
        }

        if (messageWithClaim) {
            const updatedComponents = messageWithClaim.components
                .filter(row => !row.components.some(comp => comp.customId === 'unclaim-ticket'))
                .map(row => {
                    return ActionRowBuilder.from(row).setComponents(
                        row.components.map(component => {
                            if (component.customId === 'claim-ticket') {
                                return ButtonBuilder.from(component).setDisabled(false);
                            }
                            return component;
                        })
                    );
                });

                await messageWithClaim.edit({ content: updatedComponents });
        }

        await interaction.reply({ content: 'Ticket unclaimed.'});
    }
};