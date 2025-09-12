const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { adminRoles } = require('../../rolePermissions');
const ticketNameMap = require('../../ticket_name_map.json');

const DEPARTMENT_ROLES = {
    relations: '1278693098469457920',
    operations: '1278693094945984644',
    staffing: '1278693096401670195',
    ownership: '1378470067892912209'
};
const SENIOR_ROLE_ID = '1283865189778980934';
const OWNERSHIP_ROLE_ID = '1378470067892912209';

// Helpers
function isStaffMember(member) {
    const deptHit = Object.values(DEPARTMENT_ROLES).some(id => member.roles.cache.has(id));
    const adminHit = adminRoles.some(id => member.roles.cache.has(id));
    return deptHit || adminHit;
}

function resolveDepartmentFromChannelName(channelName) {
    channelName = channelName.toLowerCase();
    const match = Object.entries(ticketNameMap).find(([, short]) => channelName.startsWith(short));
    if (match) {
        let dept = match[0].split('_')[0].replace('ticket-', '');
        if (dept === 'owner') dept = 'ownership';
        return dept;
    }
    if (channelName.startsWith('private-operations-')) return 'operations';
    if (channelName.startsWith('private-staffing-')) return 'staffing';
    const maybe = Object.keys(DEPARTMENT_ROLES).find(d => channelName.startsWith(d));
    return maybe || null;
}

async function applyClaimOverwrites(ch, { departmentRoleId, claimerId }) {
    await ch.permissionOverwrites.edit(departmentRoleId, { SendMessages: false }).catch(() => {});
    await ch.permissionOverwrites.edit(claimerId, { SendMessages: true }).catch(() => {});
    await ch.permissionOverwrites.edit(SENIOR_ROLE_ID, { SendMessages: true }).catch(() => {});
    await ch.permissionOverwrites.edit(OWNERSHIP_ROLE_ID, { SendMessages: true }).catch(() => {});
}

function buildButtons({ claimed }) {
    const row = new ActionRowBuilder();
    if (claimed) {
        row.addComponents(
            new ButtonBuilder().setCustomId('unclaim-ticket').setLabel('Unclaim Ticket').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('close-ticket').setLabel('Close Ticket').setStyle(ButtonStyle.Danger),
        );
    } else {
        row.addComponents(
            new ButtonBuilder().setCustomId('claim-ticket').setLabel('Claim Ticket').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('close-ticket').setLabel('Close Ticket').setStyle(ButtonStyle.Danger),
        );
    }
    return [row];
}

async function findPanelMessage(ch) {
    const batch = await ch.messages.fetch({ limit: 50 }).catch(() => null);
    if (!batch) return null;
    return batch.find(m =>
        Array.isArray(m.components) &&
        m.components.some(row =>
            row.components?.some(btn =>
                ['claim-ticket', 'unclaim-ticket', 'close-ticket'].includes(btn.customId)
            )
        )
    ) || null;
}

async function setPanelButtons(ch, { claimed }) {
    const panel = await findPanelMessage(ch);
    if (!panel) return false;
    await panel.edit({ components: buildButtons({ claimed }) }).catch(() => {});
    return true;
}

// Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Claim this ticket'),

    async execute(interaction) {
        try {
            if (!interaction.inGuild() || !interaction.channel) {
                return interaction.reply({ content: 'Run this in a ticket channel.', flags: 64 });
            }

            const member = interaction.member;
            if (!isStaffMember(member)) {
                return interaction.reply({ content: 'Only staff can claim tickets.', flags: 64 });
            }

            const ch = interaction.channel;
            if (!ch.isTextBased?.()) {
                return interaction.reply({ content: 'This channel is not claimable.', flags: 64 });
            }

            const dept = resolveDepartmentFromChannelName(ch.name);
            const departmentRoleId = dept ? DEPARTMENT_ROLES[dept] : null;

            if (departmentRoleId) {
                await applyClaimOverwrites(ch, { departmentRoleId, claimerId: member.id });
            } else {
                await ch.permissionOverwrites.edit(member.id, { SendMessages: true }).catch(() => {});
            }

            await setPanelButtons(ch, { claimed: true });

            await ch.send(`Ticket claimed by <@${member.id}>`).catch(() => {});
            return interaction.reply({ content: 'Claimed.', flags: 64 });
        } catch (err) {
            console.error('Slash claim error', err);
            if (interaction.deferred || interaction.replied) {
                return interaction.followUp({ content: 'Could not claim this ticket', flags: 64 }).catch(() => {});
            }
            return interaction.reply({ content: 'Could not claim this ticket', flags: 64 }).catch(() => {});
        }
    }
};
