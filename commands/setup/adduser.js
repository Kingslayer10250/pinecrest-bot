const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { adminRoles } = require('../../rolePermissions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adduser')
        .setDescription('Add a user to this ticket')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to add to this ticket')
                .setRequired(true)
        ),
    async execute(interaction) {
        const userToAdd = interaction.options.getUser('user');
        const channel = interaction.channel;
        const member = interaction.member;

        const hasPermission = member.roles.cache.some(r => adminRoles.includes(r.id));
        if (!hasPermission) {
            return interaction.reply({ content: `You don't have permission to use this command.`, flags: 64 });
        }

        const IS_TICKET = 
            /^(?:[a-z-]+)-\d{3}$/i.test(channel.name) ||
            /^(?:[a-z-]+)-[a-z0-9]+-\d{3}$/i.test(channel.name) ||
            /^private-(ops|staff)-\d{3}$/i.test(channel.name) ||
            /^private-[a-z0-9]+-\d{3}$/i.test(channel.name);

        if (!IS_TICKET) {
            return interaction.reply({
                content: 'You can only use this command in a ticket or private discussion channel.',
                flags: 64
            });
        }

        try {
            const existing = channel.permissionOverwrites.cache.get(userToAdd.id);
            if (existing?.allow.has('ViewChannel') && existing?.allow.has('SendMessages')) {
                return interaction.reply({ content: `That user already has access to this channel.`, flags: 64 });
            }

            await channel.permissionOverwrites.edit(userToAdd.id, {
                ViewChannel: true,
                SendMessages: true
            });

            await interaction.reply({ content: `✅ Added <@${userToAdd.id}> to this ticket.`, flags: 64 });
            await channel.send(`<@${userToAdd.id}> has been added to the ticket by <@${interaction.user.id}>.`);
        } catch (error) {
            console.error('Failed to add user:', error);
            await interaction.reply({ content: 'Failed to add the user. Do I have the right permissions?', flags: 64 });
        }
    }
};