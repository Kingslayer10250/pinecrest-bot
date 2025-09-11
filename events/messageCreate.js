const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');

const USER_RESPONSE_CATEGORY = '1379866359835529247';
const STAFF_RESPONSE_CATEGORY = '1379866454236725318';

const DEPARTMENT_ROLES = {
    relations: '1278693098469457920',
    operations: '1278693094945984644',
    staffing: '1278693096401670195',
    ownership: '1378470067892912209'
};

require('dotenv').config();

const STAFF_LOG_CHANNEL = '1396280491430121522';

const ruleTriggers = require('../moderation/ruleTriggers');
const sendViolationLog = require('../moderation/violationLog');

const HONEYPOT_MAP = {
    '1269762250219192491': '1408820361390325971'
};

const MOD_LOG__MAP = {
    '1269762250219192491': '1396280491430121522'
};

const getModLogChannel = (guild) => {
    const id = MOD_LOG__MAP[guild.id];
    return id ? guild.channels.cache.get(id) : null;
};

const HONEYPOT_TEST_PHRASE = 'testpinebot';
const HONEYPOT_TEST_COOLDOWN = 30_000;
const honeypotTestCooldown = new Map();

const APPEALS_INVITE = process.env.APPEALS_INVITE;

const HONEYPOT_DELETE_WINDOW = 604800;

// ===Helper===
async function sweepRecentMessagesByUser(guild, userId, perChannelPeek = 200) {
    let totalDeleted = 0;

    for (const [, channel] of guild.channels.cache) {
        if (!channel || !channel.isTextBased?.() || !channel.viewable) continue;

        try {
            const batch = await channel.messages.fetch({ limit: Math.min(200, perChannelPeek) }).catch(() => null);
            if (!batch || batch.size === 0) continue;

            const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
            const toDelete = batch.filter(m => m.author?.id === userId && m.createdTimestamp >= cutoff);

            if (toDelete.size) {
                const deleted = await channel.bulkDelete(toDelete, true).catch(() => null);
                if (deleted) totalDeleted += deleted.size || 0;
            }

            await new Promise (r => setTimeout(r, 300));
        } catch {

        }
    }

    return totalDeleted;
}


module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (!message.guild || !message.channel) return;


        // Stupid Fun 
        if (message.content === `<@968999850203050014>`) {
            await message.channel.send(`Hello`);
            return;
        }

        // === Pinebot Moderation ===
        const member = await message.guild.members.fetch(message.author.id).catch(() => null);
        if (!member) return;

        if (!member.roles.cache.has(DEPARTMENT_ROLES.ownership)) {
            for (const trigger of ruleTriggers) {
                if (trigger.regex.test(message.content.toLowerCase())) {
                    const isSevere = trigger.severity === 'high';
                    await sendViolationLog(message, trigger, isSevere);

                    if (!message.channel.name.startsWith('ticket-')) {
                        await message.reply({
                            content: `Please avoid posting ${trigger.reason.toLowerCase()}.`
                        }).catch(() => {});
                    }

                    break;
                }
            }
        }

        // === Honeypot Auto-Ban ===
        try {
            const honeypotId = HONEYPOT_MAP[message.guild.id];
            if (honeypotId && message.channel.id === honeypotId) {
                if (message.author.bot) return;

                const isOwnership = message.member?.roles.cache.has(DEPARTMENT_ROLES.ownership);
                const contentLower = (message.content || '').trim().toLowerCase();
                const wantsTest = isOwnership && contentLower.includes(HONEYPOT_TEST_PHRASE);

                if (wantsTest) {
                    const now = Date.now();
                    const last = honeypotTestCooldown.get(message.author.id) || 0;
                    if (now - last < HONEYPOT_TEST_COOLDOWN) return;
                    honeypotTestCooldown.set(message.author.id, now);

                    await message.delete().catch(() => {});

                    const logChannel = getModLogChannel(message.guild);
                    if (logChannel) {
                        const embed = new EmbedBuilder()
                            .setTitle('Pinebot Auto-Ban Test')
                            .setColor(0x57F287)
                            .addFields(
                                { name: 'User', value: `<@${message.author.id}> (${message.author.tag})`, inline: true },
                                { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
                                { name: 'Action', value: 'TEST - This action was completed successfully!'},
                                {
                                    name: 'Message Snippet',
                                    value: message.content?.trim()
                                        ? `\`\`\`\n${String(message.content).slice(0, 500)}\n\`\`\``
                                        : '_No text content_'
                                }
                            )
                            .setFooter({ text: 'Pinebot Moderation' })
                            .setTimestamp();

                            await logChannel.send({ embeds: [embed] }).catch(() => {});
                    }
                    return;
                }

                if (!isOwnership) {
                    await message.delete().catch(() => {});

                    let dmSent = false;
                    try {
                        const dmLines = [
                            `Hey ${message.author.username}, you were automatically banned from **${message.guild.name}**`,
                            `because you posted in our **do-not-post** channel (used to catch spam).`,
                        ];
                        if (APPEALS_INVITE) {
                            dmLines.push('');
                            dmLines.push(`If this was a mistake you can appeal your ban here: ${APPEALS_INVITE}`);
                        }

                        const dm = await message.author.createDM();
                        await dm.send(dmLines.join('\n'));
                        dmSent = true;
                    } catch {
                        dmSent = false;
                    }

                    let banOk = false;
                    try {
                        await message.guild.members.ban(message.author.id, {
                            reason: 'Posted in do-not-post channel',
                            deleteMessageSeconds: HONEYPOT_DELETE_WINDOW,
                        });
                        banOk = true;
                    } catch (err) {
                        console.error('Honeypot ban failed:', err);
                    }

                    let sweptCount = 0;
                    if (banOk) {
                        try {
                            sweptCount = await sweepRecentMessagesByUser(message.guild, message.author.id, 200);
                        } catch (err) {
                            console.error('Sweep failed:', err);
                        }
                    }

                    const logChannel = getModLogChannel(message.guild);
                    if (logChannel) {
                        const embed = new EmbedBuilder()
                            .setTitle('Pinebot Auto-Ban')
                            .setColor(banOk ? 0xED4245 : 0xFEE75C)
                            .addFields(
                                { name: 'User', value: `<@${message.author.id}> (${message.author.tag})`, inline: true },
                                { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
                                { name: 'Action', value: banOk ? 'BANNED' : 'Ban Failed', inline: true },
                                { name: 'DM Notice', value: dmSent ? 'Sent' : 'Failed / Closed', inline: true },
                                { name: 'Deleted Messages', value: `${Math.floor(HONEYPOT_DELETE_WINDOW / 86400)} day(s)`, inline: true },
                                { name: 'Extra Sweep', value: sweptCount ? `${sweptCount} msg(s)` : '0', inline: true },
                                {
                                    name: 'Message Snippet',
                                    value: message.content?.trim()
                                        ? `\`\`\`\n${String(message.content).slice(0, 500)}\n\`\`\``
                                        : '_No Text Content_'
                                }
                            )
                            .setFooter({ text: 'Pinebot Moderation' })
                            .setTimestamp();

                        await logChannel.send({ embeds: [embed] }).catch(() => {});
                    }

                    return;
                }
            }
        } catch (err) {
            console.error('Honeypot block error:', err);
        }

        // === Ticket Logic === 

        const { channel, guild } = message;

        const isTicket = /^[a-z\-]+-[a-z0-9]+-\d{3}$/i.test(channel.name);
        if (!isTicket) return;

        if (!member) return;

        const isStaff = Object.values(DEPARTMENT_ROLES).some(roleId => member.roles.cache.has(roleId));
        const newParentId = isStaff ? USER_RESPONSE_CATEGORY : STAFF_RESPONSE_CATEGORY;

        if (channel.parentId !== newParentId) {
            await channel.setParent(newParentId, { lockPermissions: false }).catch(console.error);

            const ticketOwnerId = channel.permissionOverwrites.cache.find(p =>
                p.allow.has(PermissionsBitField.Flags.ViewChannel) && p.type === 1
            )?.id;

            if (!ticketOwnerId) return;

            const prefix = channel.name.split('-')[0];
            const department = {
                famactions: 'operations',
                rolealterations: 'operations',
                findrole: 'operations',
                roleappeal: 'operations',
                roleapp: 'operations',
                hofapp: 'staffing',
                reportuser: 'staffing',
                requestin: 'staffing',
                strikeappeal: 'staffing',
                partnership: 'relations',
                claimprize: 'relations',
                feedback: 'relations',
                booster: 'relations',
                reportadmin: 'ownership',
                activityappeal: 'ownership',
                adminappeal: 'ownership',
                famapps: 'ownership',
                other: 'ownership'
            }[prefix];

            const staffRoleId = DEPARTMENT_ROLES[department];
            if (!staffRoleId) return;

            await channel.permissionOverwrites.set([
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: ticketOwnerId,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: staffRoleId,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                }
            ]).catch(() => {});
        }
    }
};