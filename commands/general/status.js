const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Show Pinebot Status'),
  async execute(interaction) {
    const up = process.uptime();
    const d = Math.floor(up / 86400);
    const h = Math.floor((up % 86400) / 3600);
    const m = Math.floor((up % 3600) / 60);
    const s = Math.floor(up % 60);

    const mem = process.memoryUsage();
    const rssMb = (mem.rss / 1024 / 1024).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle('Pinebot Status')
      .addFields(
        { name: 'Uptime', value: `${d}d ${h}h ${m}m ${s}s`, inline: true },
        { name: 'Platform', value: os.platform(), inline: true },
        { name: 'Memory (RSS)', value: `${rssMb} MB`, inline: true },
      )
      .setFooter({ text: `PID ${process.pid} | Node ${process.version}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
  }
};