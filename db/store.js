const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'pinebot.db'));

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS counters (
        name TEXT PRIMARY KEY,
        value INTEGER NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS tickets (
        ticket_id   TEXT PRIMARY KEY,   -- channel id
        guild_id    TEXT NOT NULL,
        channel_id  TEXT NOT NULL,
        name        TEXT NOT NULL,
        department  TEXT NOT NULL,
        opener_id   TEXT NOT NULL,
        claimed_by  TEXT,               -- nullable
        tags_json   TEXT NOT NULL DEFAULT '["Unclaimed", "General"]',
        created_at  INTEGER NOT NULL,
        updated_at  INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tickets_guild_dept ON tickets(guild_id, department);
`);

const getCounter = db.prepare(`SELECT value FROM counters WHERE name=?`);
const upsertCounter = db.prepare(`
    INSERT INTO counters (name, value) VALUES (?, ?)
    ON CONFLICT(name) DO UPDATE SET value=excluded.value
`);

function nextTicketNumber() {
    const row = getCounter.get('ticket_number');
    const current = row ? row.value : 1;
    const next = current;
    upsertCounter.run('ticket_number', current + 1);
    return next;
}

const getTicket = db.prepare(`SELECT * FROM tickets WHERE ticket_id=?`);
const upsertTicket = db.prepare(`
    INSERT INTO tickets (ticket_id, guild_id, channel_id, name, department, opener_id, claimed_by, tags_json, created_at, updated_at)
    VALUES (@ticket_id, @guild_id, @channel_id, @name, @department, @opener_id, @claimed_by, @tags_json, @created_at, @updated_at)
    ON CONFLICT (ticket_id) DO UPDATE SET
        name = excluded.name,
        department = excluded.department,
        opener_id = excluded.opener_id,
        claimed_by = excluded.claimed_by,
        tags_json = excluded.tags_json,
        updated_at = excluded.updated_at
    `);

function recordTicketOpen({ ticket_id, guild_id, channel_id, name, department, opener_id }) {
    const now = Date.now();
    upsertTicket.run({
        ticket_id, guild_id, channel_id, name, department, opener_id,
        claimed_by: null,
        tags_json: '["Unclaimed", "General"]',
        created_at: now,
        updated_at: now
    });
}

function markClaim({ ticket_id, claimed_by }) {
    const row = getTicket.get(ticket_id);
    if (!row) return;
    const tags = new Set(JSON.parse(row.tags_json));
    tags.delete('Unclaimed'); tags.add('Claimed');
    upsertTicket.run({
        ...row,
        claimed_by,
        tags_json: JSON.stringify([...tags]),
        updated_at: Date.now()
    });
}

function markUnclaim({ ticket_id }) {
    const row = getTicket.get(ticket_id);
    if (!row) return;
    const tags = new Set(JSON.parse(row.tags_json));
    tags.delete('Claimed'); tags.add('Unclaimed');
    upsertTicket.run({
        ...row,
        claimed_by: null,
        tags_json: JSON.stringify([...tags]),
        updated_at: Date.now()
    });
}

function markResolved({ ticket_id }) {
    const row = getTicket.get(ticket_id);
    if (!row) return;
    const tags = new Set(JSON.parse(row.tags_json));
    tags.add('Resolved');
    upsertTicket.run({
        ...row,
        tags_json: JSON.stringify([...tags]),
        updated_at: Date.now()
    });
}

module.exports = {
    nextTicketNumber,
    recordTicketOpen,
    markClaim,
    markUnclaim,
    markResolved
};