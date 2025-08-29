const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const guildId = '1269762250219192491';

(async () => {
    try {
        console.log('Clearing guild commands..');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            { body: []}
        );
        console.log('Guild commands cleared!');
    } catch (error) {
        console.error(error);
    }
})();