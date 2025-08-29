const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const fs = require('fs');

const BOT_PATH = '/home/kingslayer1087/pinecrest-bot';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('DEV ONLY - Pulls latest changes from Github and restarts the bot.'),

    async execute(interaction) {
        const allowedUserId = '968999850203050014';
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', flags: 64 });
        }

        await interaction.reply('🔄 Checking for updates...');

        exec(`git -C ${BOT_PATH} pull`, async (error, stdout, stderr) => {
            if (error || stderr.includes('fatal')) {
                return interaction.followUp({
                    content: `❌ Git pull failed:\n\`\`\`${stderr || error.message}\`\`\``
                });
            }

            if (stdout.includes('Already up to date')) {
                return interaction.followUp({ content: '✅ Bot is already up to date!'});
            }

            await interaction.followUp({ content: '✅ Update found, restarting bot...'});

            fs.writeFileSync(`${BOT_PATH}/.restart-flag`, interaction.channelId);

            exec(`pm2 restart pinecrest-bot`, (restartErr, restartOut, restartStderr) => {
                if (restartErr || restartStderr.includes('Error')) {
                    return interaction.followUp({
                        content: `⚠️ Bot restart failed:\n\`\`\`${restartStderr || restartErr.message}\`\`\``
                    });
                }

                interaction.followUp({ content: '✅ Bot restarted successfully!'});
            });
        });
    },
};