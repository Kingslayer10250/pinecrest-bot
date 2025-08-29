const cron = require('node-cron');

const ROLE_IDS = {
    ownership: '1378470067892912209',
    relations: '1278693098469457920',
    staffing: '1278693096401670195',
    operations: '1278693094945984644',
};

const CATEGORY_ID = '1269853935888240640';
const CHANNEL_ID_TO_SEND = '1335606325786316830';

const TICKET_PREFIXES = {
  ownership: ['reportadmin', 'familyapp', 'activityappeal', 'activitywaiver', 'adminappeal', 'other', 'complaints'],
  relations: ['partnerships', 'booster', 'spotlight', 'feedback'],
  staffing: ['hofapp', 'reportuser', 'requestin', 'strikeappeal'],
  operations: ['rolealterations', 'findrole', 'roleappeal', 'famactions', 'role-app'],
};

async function sendTicketReminder(client, channelId) {
    const guild = await client.guilds.fetch(client.guilds.cache.first().id);
    const channels = await guild.channels.fetch();

    const pending = {
        ownership: 0,
        relations: 0,
        staffing: 0,
        operations: 0,
    };

    for (const [_, channel] of channels) {
        if (
            channel.parentId === CATEGORY_ID &&
            channel.name &&
            !channel.deleted
        ) {
            for (const [team, prefixes] of Object.entries(TICKET_PREFIXES)) {
                if (prefixes.some(prefix => channel.name.startsWith(prefix))) {
                    pending[team]++;
                    break;
                }
            }
        }
    }

    const totalTickets = Object.values(pending).reduce((a, b) => a + b, 0);

    if (totalTickets >= 10) {
        const lines = Object.entries(pending).map(([team, count]) => {
            return `<@&${ROLE_IDS[team]}> = **${count}** ticket${count === 1 ? '' : 's'} pending.`;
        });

        const message = `**Ticket Summary**\n\n${lines.join('\n')}\n\nPlease ensure tickets are being handled and closed appropriately.`;

        const logChannel = await guild.channels.fetch(channelId);
        if (logChannel) await logChannel.send(message);
        return true;
    } else {
        console.log(`[REMINDER] Skipped; Only ${totalTickets} ticket(s) open.`);
        return false;
    }
}

module.exports = (client) => {
    cron.schedule('0 10 * * *', () => {
        sendTicketReminder(client, CHANNEL_ID_TO_SEND);
    });
};

module.exports.sendTicketReminder = sendTicketReminder;