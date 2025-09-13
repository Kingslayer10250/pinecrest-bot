const { EmbedBuilder } = require('discord.js');

const COMMAND_LOG_CHANNEL_ID = '1359340211531944026';

function formatOptions(option = []) {
    const parts = [];
    for (const opt of options) {
        if (opt.type === 1 /* SUB_COMMAND */ || opt.type === 2 /* SUB_COMMAND_GROUP */) {
            const path = opt.name + (opt.options?.length ? ' ' + formatOptions(opt.options) : '');
            parts.push(path);
            continue;
        }

        let val = opt.value;
        if (opt.user) val = `<@${opt.user.id}>`;
        if (opt.member) val = `<@${opt.member.user?.id || opt.member.id}>`;
        if (opt.channel) val = `<#${opt.channel.id}>`;
        if (opt.role) val = `<@&${opt.role.id}>`;

        parts.push(`${opt.name}: ${val}`);
    }
    return parts.join(', ') || 'None';
}

/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {{status: 'success'|'error', error?: any, durationMs?: number}} meta
*/

async function logCommand(interaction, meta = { status: 'success' }) {
    try {
        const ch = await interaction.client.channels.fetch(COMMAND_LOG_CHANNEL_ID).catch(() => null);
        if (!ch || !ch.isTextBased?.()) return;

        const cmdPath = (() => {
            const data = interaction.options?.data || [];
            const segs = [ '/' + interaction.commandName ];
            const first = data[0];
            if (first?.type === 2) segs.push(first.name);
            const sub = first?.options?.[0];
            if (first?.type === 1) segs.push(first.name);
            else if (sub?.type === 1) segs.push(sub.name);
            return segs.join(' ');
        })();

        const leafOptions = (() => {
            const d = interaction.options?.data || [];
            const first = d[0];
            if (!first) return d;
            if (first.type === 1) return first.options || [];
            if (first.type === 2) return first.options?.[0]?.options || [];
            return d;
        })();

        const optionsText = formatOptions(leafOptions);
        const user = interaction.user;

        const color = meta.status === 'success' ? 0x3BA55D : 0xED4245;
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Command Used')
            .addFields(
                { name: 'Staff Member', value: `${user.tag} (${user.id})`, inline: true },
                { name: 'Command', value: cmdPath, inline: true },
                { name: 'Options', value: optionsText }
            )
            .setFooter({
                text: `Server: ${interaction.guild?.name || 'DMs'} • Channel: #${interaction.channel?.name || 'DMs'} • ${meta.status.toUpperCase()}${meta.durationMs != null ? `• ${meta.durationMs}ms` : ''}`
            })
            .setTimestamp();

        if (meta.status === 'error' && meta.error) {
            const errMsg = (meta.error?.message || String(meta.error || '')).slice(0, 512);
            embed.addFields({ name: 'Error', value: '```' + errMsg + '```' });
        }

        await ch.send({ embeds: [embed] });
    } catch (e) {
        console.error('Failed to log command:', e);
    }
}

module.exports = { logCommand };