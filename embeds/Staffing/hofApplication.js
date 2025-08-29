const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createHOFApplicationEmbed(userId, roleId) {
    const embed = new EmbedBuilder()
        .setTitle('𝑯𝒐𝑭 𝑨𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏')
        .setDescription(`
            Thank you for opening a **HoF application** ticket! While you're waiting for a response, please fill out the following template;

            ═══════════════════

            **Roblox Username:**
            **Roblox Display Name:**
            **Role Name:**
            **Your Family:**
            **Timezone:**
            **How experienced are you with roleplays? (1-10):**
            **How active are you on discord? (1-10):**
            **How active are you on roblox? (1-10):**
            **Why are you applying for HoF?:**
            **Do you accept the responsibilies of a HoF? (see below):**
            • Maintaining activity of your family.
            • Arranging individual roleplays for your family.
            • Keeping the peace and moderating your families groupchat.

            ═══════════════════

            A member of the <:StaffingTeam:1279554228653789265> **Staffing Team** will respond soon.
        `)
        .setColor(0xD8A3F5)
        .setImage('https://media.discordapp.net/attachments/1272625330112172113/1378712265360150618/thing_11.png?ex=683d995b&is=683c47db&hm=2a6d3dacbde331242184404f65592aac238a510fe71053da6334fc0e5d4d58a9&=&format=webp&quality=lossless')

    const closeButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('close-ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('claim-ticket')
            .setLabel('Claim Ticket')
            .setStyle(ButtonStyle.Secondary)
    );

    return { embed, components: [closeButton] };
}

module.exports = { createHOFApplicationEmbed };