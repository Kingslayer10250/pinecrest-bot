const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const { adminRoles } = require('../../rolePermissions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Claim the current ticket')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;
        const hasAccess = member.roles.cache.some(role => adminRoles.includes(role.id));

        if (!hasAccess) {
            return interaction.reply({ content: 'You do not have permission to use this command.', flags: 64 });
        }

        const ticketPattern = /^.+-[a-z0-9]+-\d+$/;
        if (!ticketPattern.test(interaction.channel.name)) {
            return interaction.reply({
                content: 'This command can only be used in a valid ticket channel.',
                flags: 64
            });
        }

        const topic = `Claimed by ${interaction.user.tag}`;
        await channel.setTopic(topic).catch(() => {});

        let messageWithClaim;
        try {
            const messages = await channel.messages.fetch({ limit: 20 });
            messageWithClaim = messages.find(msg =>
                msg.components?.some(row =>
                    row.components.some(comp => comp.customId === 'claim-ticket')
                )
            );
        } catch (err) {
            console.error('Error fetching messages:', err);
        }

        if (messageWithClaim) {
            const updatedComponents = messageWithClaim.components.map(row => {
                return ActionRowBuilder.from(row).setComponents(
                    row.components.map(component => {
                        if (component.data.custom_id === 'claim-ticket') {
                            return ButtonBuilder.from(component).setDisabled(true);
                        }
                        return component;
                    })
                );
            });

            updatedComponents.push(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('unclaim-ticket')
                        .setLabel('Unclaim Ticket')
                        .setStyle(ButtonStyle.Secondary)
                )
            );

            await messageWithClaim.edit({ components: updatedComponents });
        }

        await interaction.reply({ content: `Ticket claimed by <@${interaction.user.id}>` });
    }
};