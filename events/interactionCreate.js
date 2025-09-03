const { Events, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const Store = require('../db/store');

const DEPARTMENT_ROLES = {
  relations: '1278693098469457920',
  operations: '1278693094945984644',
  staffing: '1278693096401670195',
  ownership: '1378470067892912209',
  appeals: '1399568425927577650'
};

const CATEGORY_MAP = {
  '1269762250219192491': '1379866359835529247',
  '1345572181723320422': '1359351434063253626'
};

const LOG_CHANNEL_MAP = {
  '1269762250219192491': {
    relations: '1399887572443857067',
    operations: '1399887610884915230',
    staffing: '1399887651225604129',
    ownership: '1379540333938999347'
  },
  '1345572181723320422': {
    appeals: '1345576603639615658'
  }
};

const { adminRoles } = require('../rolePermissions');


const { createTranscript } = require('discord-html-transcripts');

const { createFamilyActionsEmbed } = require('../embeds/Operations/familyActions');
const { createFindARoleEmbed } = require('../embeds/Operations/findaRole');
const { createRoleAlterationsEmbed } = require('../embeds/Operations/roleAlterations');
const { createRoleBlacklistAppealEmbed } = require('../embeds/Operations/roleblacklistAppeal');
const { createRoleApplicationsEmbed } = require('../embeds/Operations/roleApplications');

const { createActivityAppealEmbed } = require('../embeds/Ownership/activityAppeal');
const { createAdminAppealEmbed } = require('../embeds/Ownership/adminAppeal');
const { createFamilyApplicationEmbed } = require('../embeds/Ownership/familyApplications');
const { createOtherEmbed } = require('../embeds/Ownership/other');
const { createReportAdminEmbed } = require('../embeds/Ownership/reportAdmin');
const { createActivityWaiverEmbed } = require('../embeds/Ownership/activityWaiver');
const { createComplaintsEmbed } = require('../embeds/Ownership/complaints');

const { createBoosterRoleEmbed } = require('../embeds/Relations/boosterRole');
const { createclaimPrizeEmbed } = require('../embeds/Relations/claimPrize');
const { createPartnershipsEmbed } = require('../embeds/Relations/partnerships');
const { createServerFeedbackEmbed } = require('../embeds/Relations/serverFeedback');

const { createHOFApplicationEmbed } = require('../embeds/Staffing/hofApplication');
const { createReportUserEmbed } = require('../embeds/Staffing/reportUser');
const { createRequestINEmbed } = require('../embeds/Staffing/requestIN');
const { createStrikeAppealEmbed } = require('../embeds/Staffing/strikeAppeals');
const { createPrivateDiscussionEmbed } = require('../embeds/privateDiscussionEmbed');

const { createappealsEmbed } = require('../embeds/appealsEmbed');

const PRIVATE_PREFIX_TO_DEPT = {
  'private-ops': 'operations',
  'private-staff': 'staffing'
};

const ticketNameMap = require('../ticket_name_map.json');

// --- Helpers ---

const truncate = (s, n) => (s && s.length > n ? s.slice(0, n) + '...' : s || '');
const escapeBackticks = s => (s || '').replace(/```/g, '\\`\\`\\`');

function embedToText(e) {
  const bits = [];
  if (e?.title) bits.push(`title="${truncate(String(e.title))}"`);
  if (e?.description) bits.push(`desc="${truncate(String(e.description).replace(/\n/g, ' '))}"`);
  if (e?.url) bits.push(`url=${e.url}`);
  if (Array.isArray(e?.fields) && e.fields.length) bits.push(`fields=${e.fields.length}`);
  if (e?.footer?.text) bits.push(`footer="${truncate(String(e.footer.text), 60)}"`);
  return `[Embed ${bits.join(' | ')}]`;
}

function formatMessageForTranscript(msg) {
  try {
    const parts = [];

    if (msg?.content && msg.content.trim()) {
      parts.push(escapeBackticks(msg.content));
    }

    const attachments = (msg?.attachments?.size
      ? Array.from(msg.attachments.values()).map(a => a?.url).filter(Boolean)
      : []);
    if (attachments.length) {
      parts.push(`[Attachments: ${attachments.join(', ')}]`);
    }

    const embeds = Array.isArray(msg?.embeds) ? msg.embeds : [];
    if (embeds.length) {
      parts.push(embeds.map(embedToText).join(' '));
    }

    const stickers = (msg?.stickers?.size
      ? Array.from(msg.stickers.values()).map(s => s?.name).filter(Boolean)
      : []);
    if (stickers.length) {
      parts.push(`[Stickers: ${stickers.join(', ')}]`);
    }

    return parts.join(' ').trim() || '[No Content]';
  } catch {
    return '[Unformatted Message]';
  }
}

function splitIntoChunks(text, chunkSize = 1900) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

async function fetchAllMessages(channel, hardCap = 5000) {
  const all = [];
  let lastId = null;

  while (true) {
    const batch = await channel.messages.fetch({ limit: 100, before: lastId }).catch(() => null);
    if (!batch || batch.size === 0) break;

    for (const m of batch.values()) all.push(m);

    lastId = batch.last().id;
    if (all.length >= hardCap) break;
  }
  return all.reverse();
}

function safeDeleteChannel(channel, delayMs = 0) {
  const ch = channel;
  setTimeout(() => {
    try {
      if (!ch) return;
      if (!('deletable' in ch) || !ch.deletable) return;
      ch.delete().catch(() => {});
    } catch (e) {
      console.error('safeDeleteChannel error:', e);
    }
  }, delayMs);
}

function isStaffMember(member) {
  const deptHit = Object.values(DEPARTMENT_ROLES).some(id => member.roles.cache.has(id));
  const adminHit = adminRoles.some(id => member.roles.cache.has(id));
  return deptHit || adminHit;
}

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    const categoryID = CATEGORY_MAP[interaction.guild.id];
    
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error('Command execution error:', error);
        await interaction.reply({ content: 'There was an error executing this command.', flags: 64 });
      }
    }

    if (interaction.isButton()) {
      const customId = interaction.customId;

      if (customId === 'close-ticket') {

        if (!isStaffMember(interaction.member)) {
          return interaction.reply({ content: 'Only staff can close tickets.', flags: 64 });
        }

        const confirmRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('confirm-close')
            .setLabel('Confirm Close')
            .setStyle(ButtonStyle.Danger)
        );
        return interaction.reply({
          content: 'Are you sure you want to close this ticket?',
          components: [confirmRow],
          flags: 64
        });
      }

      if (customId === 'confirm-close') {

        if (!isStaffMember(interaction.member)) {
          return interaction.reply({ content: 'Only staff can close tickets.', flags: 64 });
        }

        try {
          if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ flags: 64 });
          }

          const sorted = await fetchAllMessages(interaction.channel, 5000);
          const logLines = [];
          for (const msg of sorted) {
            const ts = new Date(msg.createdTimestamp).toLocaleString();
            const author = msg.author?.tag || msg.author?.id || 'Unknown';
            const body = formatMessageForTranscript(msg);
            logLines.push(`[${ts}] ${author}: ${body}`);
          }

          const channelName = interaction.channel.name.toLowerCase();

          let department = null;
          const match = Object.entries(ticketNameMap).find(([, shortName]) =>
            channelName.startsWith(shortName)
          );
          if (match) {
            const [matchedCustomId] = match;
            department = matchedCustomId.split('_')[0].replace('ticket-', '');
            if (department === 'owner') department = 'ownership';
          }

          if (!department) {
            if (channelName.startsWith('private-operations-')) {
              department = 'operations';
            } else if (channelName.startsWith('private-staffing-')) {
              department = 'staffing';
            } else {
              const maybe = Object.keys(DEPARTMENT_ROLES).find(d => channelName.startsWith(d));
              if (maybe) department = maybe;
            }
          }

          const logChannelID = LOG_CHANNEL_MAP[interaction.guild.id]?.[department];
          const logChannel = logChannelID ? interaction.guild.channels.cache.get(logChannelID) : null;

          const chunks = splitIntoChunks(logLines.join('\n'), 1900);

          if (logChannel) {
            await logChannel.send(`**Ticket Closed.** Transcript for \`${interaction.channel.name}\` (${sorted.length} messages):`);
            for (const chunk of chunks) {
              await logChannel.send({ content: `\`\`\`\n${chunk}\n\`\`\``});
              await new Promise(r => setTimeout(r, 250));
            }
          }

          Store.markResolved({ ticket_id: interaction.channel.id });

          await interaction.editReply({ content: `Closing Ticket... <@${interaction.user.id}>` });
          safeDeleteChannel(interaction.channel, 3000);
          return;
        } catch (err) {
          console.error('Error in confirm-close', err);
          if (interaction.deferred && !interaction.replied) {
            await interaction.editReply({ content: 'Something went wrong trying to close this ticket.' });
          } else if (!interaction.replied) {
            await interaction.reply({ content: 'Something went wrong trying to close this ticket.', flags: 64 });
          }
        }
        return;
      }

      if (customId === 'claim-ticket') {
        const member = interaction.member;
        const currentTopic = interaction.channel.topic;

        const allowedRoles = ['1269768427925405837', '1311069586522640394', '1370206192101752974', '1283865189778980934', '1269768428516806686', '1340771352923213865'];
        const hasAccess = member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasAccess) {
          return interaction.reply({ content: 'You do not have permission to claim this ticket.', flags: 64});
        }

        if (currentTopic && currentTopic.startsWith('Claimed by')) {
          return interaction.reply({ content: `This ticket is already claimed (${currentTopic}).`, flags: 64});
        }

        try {
          await interaction.channel.setTopic(`Claimed by ${member.user.tag}`);

          const newComponents = [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('unclaim-ticket')
                .setLabel('Unclaim Ticket')
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('close-ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger)
            )
          ];

          await interaction.update({ components: newComponents });
          await interaction.channel.send(`Ticket claimed by <@${member.id}>`);
          Store.markClaim({ ticket_id: interaction.channel.id, claimed_by: interaction.member.id });
        } catch (err) {
          console.error('Error claiming:', err);
          if (interaction.deferred || interaction.replied) {
            await interaction.followUp({ content: 'Something went wrong while claiming.', flags: 64 });
          } else {
            await interaction.reply({ content: 'Something went wrong while claiming.', flags: 64 });
          }
        }
      }

      if (customId === 'unclaim-ticket') {
        const allowedRoles = ['1269768427925405837', '1311069586522640394', '1370206192101752974', '1283865189778980934', '1269768428516806686', '1340771352923213865'];
        const hasAccess = interaction.member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasAccess) {
          return interaction.reply({ content: 'You do not have permission to unclaim this ticket', flags: 64 });
        }

        try {
          await interaction.deferUpdate();
          await interaction.channel.setTopic(null);

          const newComponents = [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('claim-ticket')
                .setLabel('Claim Ticket')
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('close-ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger)
            )
          ];

          await interaction.message.edit({ components: newComponents });
          await interaction.channel.send('Ticket unclaimed.');
          Store.markUnclaim({ ticket_id: interaction.channel.id });
        } catch (err) {
          console.error('Error unclaiming:', err);
          if (interaction.deferred || interaction.replied) {
            await interaction.followUp({ content: 'Something went wrong while unclaiming.', flags: 64 });
          } else {
            await interaction.reply({ content: 'Something went wrong while unclaiming.', flags: 64 });
          }
        }
      }

      if (customId === 'open-private-ops' || customId === 'open-private-staff') {
        const dept = customId === 'open-private-ops' ? 'operations' : 'staffing';
        const roleId = DEPARTMENT_ROLES[dept];
        if (!roleId) {
          return interaction.reply({ content: 'Department role not configured.', flags: 64 });
        }

        if (!interaction.member.roles.cache.has(roleId)) {
          return interaction.reply({ content: `You need the ${dept} role to open this`, flags: 64 });
        }

        const ticketNumber = Store.nextTicketNumber();

        const channelName = `private-${dept}-${ticketNumber.toString().padStart(3, '0')}`;

        await interaction.deferReply({ flags: 64 });

        const categoryID = CATEGORY_MAP[interaction.guild.id];
        const permissionOverwrites = [
          { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
          { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages. PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks] },
          { id: roleId, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks] }
        ];

        const channel = await interaction.guild.channels.create({
          name: channelName,
          type: 0,
          parent: categoryID,
          permissionOverwrites
        });

        Store.recordTicketOpen({
          ticket_id: channel.id,
          guild_id: interaction.guild.id,
          channel_id: channel.id,
          name: channel.name,
          department: dept,
          opener_id: interaction.user.id
        });

        await channel.send({ content: `<@${interaction.user.id}> <@&${roleId}>` })
          .then(msg => setTimeout(() => msg.delete().catch(() => {}), 1000));

        const { embed, components } = createPrivateDiscussionEmbed(interaction.user.id, roleId);
        await channel.send({ embeds: [embed], components });

        const logChannelID = LOG_CHANNEL_MAP[interaction.guild.id]?.[dept];
        const logChannel = interaction.guild.channels.cache.get(logChannelID);
        if (logChannel) {
          await logChannel.send({
            content: `**Private Discussion Opened:** \`${channelName}\` by ${interaction.user.id} (${interaction.user.tag})`
          });
        }

        await interaction.editReply({ content: `Your private discussion channel has been created: ${channel}` });
        return;
      }
      
      if (!customId.startsWith('ticket-')) return;

      const channelShort = ticketNameMap[customId];
      if (!channelShort) {
        return interaction.reply({ content: 'This button is not properly linked.', flags: 64});
      }

      let department = customId.split('_')[0].replace('ticket-', '');
      if (department === 'owner') department = 'ownership';
      const roleId = DEPARTMENT_ROLES[department];
      if (!roleId) return;

      const username = interaction.user.username.toLowerCase().replace(/[^a-z0-9]/g, '');

      const ticketNumber = Store.nextTicketNumber();

      const channelName = `${channelShort}-${ticketNumber.toString().padStart(3, '0')}`;


      await interaction.deferReply({ flags: 64 });

      const permissionOverwrites = [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks]
        },
        {
          id: roleId,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks]
        }
      ];

      const channel = await interaction.guild.channels.create({
        name: channelName,
        type: 0,
        parent: categoryID,
        permissionOverwrites
      });

      Store.recordTicketOpen({
        ticket_id: channel.id,
        guild_id: interaction.guild.id,
        channel_id: channel.id,
        name: channel.name,
        department,
        opener_id: interaction.user.id
      });

      await channel.send({ content: `<@${interaction.user.id}> <@&${roleId}>` }).then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 1000);
      });

      const embedMap = {
        'ticket-operations_famactions': createFamilyActionsEmbed,
        'ticket-operations_rolealterations': createRoleAlterationsEmbed,
        'ticket-operations_findrole': createFindARoleEmbed,
        'ticket-operations_roleappeal': createRoleBlacklistAppealEmbed,
        'ticket-operations_roleapp': createRoleApplicationsEmbed,

        'ticket-staffing_hofapp': createHOFApplicationEmbed,
        'ticket-staffing_reportuser': createReportUserEmbed,
        'ticket-staffing_requestin' : createRequestINEmbed,
        'ticket-staffing_strikeappeal': createStrikeAppealEmbed,

        'ticket-relations_partnership': createPartnershipsEmbed,
        'ticket-relations_claimprize': createclaimPrizeEmbed,
        'ticket-relations_feedback': createServerFeedbackEmbed,
        'ticket-relations_booster': createBoosterRoleEmbed,

        'ticket-owner_reportadmin': createReportAdminEmbed,
        'ticket-owner_activityappeal': createActivityAppealEmbed,
        'ticket-owner_adminappeal': createAdminAppealEmbed,
        'ticket-owner_famapps': createFamilyApplicationEmbed,
        'ticket-owner_other': createOtherEmbed,
        'ticket-owner_complaints': createComplaintsEmbed,
        'ticket-owner_activitywaiver': createActivityWaiverEmbed,
        'ticket-appeals_ban': createappealsEmbed
      };

      const embedFunc = embedMap[customId];
      if (embedFunc) {
        const { embed, components } = embedFunc(interaction.user.id, roleId);
        await channel.send({ embeds: [embed], components });
      }

      const logChannelID = LOG_CHANNEL_MAP[interaction.guild.id]?.[department];
      const logChannel = interaction.guild.channels.cache.get(logChannelID);

      if (logChannel) {
        await logChannel.send({
          content: `**Ticket Opened:** \`${channelName}\` by ${interaction.user.id}`
        });
      }

      await interaction.editReply({
        content: `Your ticket has been created: ${channel}`
      });
    }
  }
};