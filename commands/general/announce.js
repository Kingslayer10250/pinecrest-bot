const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send an announcement as Pinebot.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel to send the announcement to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Title of the announcement')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The content of the announcement')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('ping')
        .setDescription('Role to ping in announcement')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild), // You can change who can use this

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const pingRole = interaction.options.getRole('ping');

    const embed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setDescription(message)
      .setColor(0xB95B5B)
      .setFooter({ text: `Announcement by Pinebot` })
      .setTimestamp();

    try {
      await channel.send({
        content: pingRole ? `<@&${pingRole.id}>` : null,
        embeds: [embed]
      });

      await interaction.reply({ content: `✅ Announcement sent in ${channel}`, flags: 64 });
    } catch (error) {
      console.error('Announcement error:', error);
      await interaction.reply({ content: '⚠️ Failed to send the announcement.', flags: 64 });
    }
  }
};
