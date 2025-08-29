const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('node:fs/promises');
const path = require('node:path');

const RELEASES_PATH = path.join(__dirname, '../../releases.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce-update')
        .setDescription('Post a Pinebot update announcement')
        .addSubcommand(sub =>
            sub
                .setName('manual')
                .setDescription('Write the announcement yourself.')
                .addChannelOption(o =>
                    o.setName('channel')
                        .setDescription('Where to post the announcement')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true))
                .addStringOption(o =>
                    o.setName('message')
                        .setDescription('Announcement Body')
                        .setRequired(true))
                .addStringOption(o =>
                    o.setName('title')
                        .setDescription('Embed Title')
                        .setRequired(false))
                .addStringOption(o =>
                    o.setName('ping')
                        .setDescription('Who to ping')
                        .addChoices(
                            { name: 'No Ping', value: 'none' },
                            { name: '@everyone', value: 'everyone' },
                            { name: '@here', value: 'here' },
                            {name: 'Specific role', value: 'role' }
                        )
                        .setRequired(false))
                .addRoleOption(o =>
                    o.setName('role')
                        .setDescription('Role to ping')
                        .setRequired(false))
        )
        .addSubcommand(sub =>
            sub
                .setName('release')
                .setDescription('Post update with version info')
                .addChannelOption(o =>
                    o.setName('channel')
                        .setDescription('Where to post announcement')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true))
                .addStringOption(o =>
                    o.setName('version')
                        .setDescription('Version label')
                        .setRequired(true))
                .addStringOption(o =>
                    o.setName('summary')
                        .setDescription('Short summary of what changed')
                        .setRequired(true))
                .addStringOption(o =>
                    o.setName('changelog')
                        .setDescription('Optional changelog')
                        .setRequired(false))
                .addBooleanOption(o =>
                    o.setName('save')
                        .setDescription('Appen this release to releases.json')
                        .setRequired(false))
                .addStringOption(o =>
                    o.setName('ping')
                        .setDescription('Who to ping')
                        .addChoices(
                            { name: 'No Ping', value: 'none' },
                            { name: '@everyone', value: 'everyone' },
                            { name: '@here', value: 'here' },
                            { name: 'Specific role', value: 'role' }
                        )
                        .setRequired(false))
                .addRoleOption(o =>
                    o.setName('role')
                        .setDescription('Role to ping')
                        .setRequired(false))
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

        async execute(interaction) {
            const sub = interaction.options.getSubcommand();

            const channel = interaction.options.getChannel('channel');

            const pingChoice = interaction.options.getString('ping') ?? 'none';
            const roleToPing = interaction.options.getRole('role') || null;

            let mentionText = '';
            const allowedMentions = { parse: [] };

            if (pingChoice === 'everyone') {
                mentionText = '@everyone';
                allowedMentions.parse.push('everyone');
            } else if (pingChoice === 'here') {
                mentionText = '@here';
                allowedMentions.parse.push('everyone');
            } else if (pingChoice === 'role' && roleToPing) {
                mentionText = `<@&${roleToPing.id}>`;
                allowedMentions.roles = [roleToPing.id];
            }

            try {
                if (sub === 'manual') {
                    const title = interaction.options.getString('title') || 'Pinebot Update';
                    const body = interaction.options.getString('message');

                    const embed = new EmbedBuilder()
                        .setTitle(title)
                        .setDescription(body)
                        .setColor(0xB95B5B)
                        .setFooter({ text: `Announcement by Pinebot` })
                        .setTimestamp();

                    await channel.send({
                        content: mentionText || undefined,
                        embeds: [embed],
                        allowedMentions
                    });

                    return interaction.reply({ content: `Update posted in ${channel}`, flags: 64 });
                }

                if (sub === 'release') {
                    const version = interaction.options.getString('version');
                    const summary = interaction.options.getString('summary');
                    const changelog = interaction.options.getString('changelog') || null;
                    const save = interaction.options.getBoolean('save');
                    const shouldSave = save === null ? true : save;

                    const embed = new EmbedBuilder()
                        .setTitle(`Pinebot Update - ${version}`)
                        .setDescription(summary)
                        .setColor(0x5BB97A)
                        .setTimestamp();

                    if (changelog) {
                        embed.addFields({ name: 'Changelog', value: changelog });
                    }

                    await channel.send({ content: mentionText || undefined, embeds: [embed], allowedMentions });

                    if (shouldSave) {
                        let releases = [];
                        try {
                            const raw = await fs.readFile(RELEASES_PATH, 'utf8').catch(() => '[]');
                            releases = JSON.parse(raw || '[]');
                        } catch {
                            releases = [];
                        }

                        releases.unshift({
                            version,
                            date: new Date().toISOString().slice(0, 10),
                            summary
                        });

                        await fs.writeFile(RELEASES_PATH, JSON.stringify(releases, null, 2), 'utf8');
                    }

                    return interaction.reply({ content: `${version} posted in ${channel}${shouldSave ? ' and saved to releases.json' : ''}.`, flags: 64 });
                }
            } catch (err) {
                console.error('announce-update error:', err);
                return interaction.reply({ content: 'Failed to send the announcement..', flags: 64 });
            }
        }
};