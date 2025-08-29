const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const STAFF_LOG_CHANNEL = '1396280491430121522';

module.exports = async function sendViolationLog(message, trigger, isSevere = false) {
    const logChannel = message.guild.channels.cache.get(STAFF_LOG_CHANNEL);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setTitle('Rule Violation Detected')
        .setColor(0xED4245)
        .addFields(
            { name: 'User', value: `<@${message.author.id}> (${message.author.tag})`, inline: true },
            { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
            { name: 'Reason', value: trigger.reason },
            { name: 'Message Content', value: `\`\`\`${message.content.slice(0, 900)}\`\`\``}
        )
        .setFooter({ text: 'Detected by Pinebot Moderation' })
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`open-warning-${message.author.id}`)
            .setLabel('Open Private Channel')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId(`ignore-warning-${message.author.id}`)
            .setLabel('Ignore')
            .setStyle(ButtonStyle.Secondary)
    );

    await logChannel.send({
        content: isSevere ? `<@&${DEPARTMENT_ROLES.staffing}>` : null,
        embeds: [embed],
        components: [row]
    });
};