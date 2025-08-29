const { Events } = require('discord.js');
const fs = require('fs');
const setupReminders = require('../scheduler/ticketReminder');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Pinecrest Bot Logged in as ${client.user.tag}`);
    console.log(`Connected Guilds:`);
    setupReminders(client); // Start cron reminders

    client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} (${guild.id})`);
    });

    const flagPath = './.restart-flag';
    if (fs.existsSync(flagPath)) {
      const channelId = fs.readFileSync(flagPath, 'utf8').trim();
      fs.unlinkSync(flagPath);

      try {
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
          await channel.send('✅ Bot has been successfully updated and restarted.');
        }
      } catch (err) {
        console.error('Failed to send restart message:', err);
      }
    }
  }
};
