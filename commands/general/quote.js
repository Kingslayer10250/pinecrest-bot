const { SlashCommandBuilder } = require('discord.js');

const quotes = [
    `"In the name of jub we eat ice cream tubs" - Carmen`,
    `"Please DO NOT fart in General chat/ VC. It makes people very uncomfortable and no one wants to get pink eye because of it. I don't want to have to add this to the rules because it's embarrassing for me as an admin and for the rest of the people trying to enjoy this server. This is your FINAL warning. Grr. Now, change it." - <@394136807769636864>`,
    `"hello" - aspellx`,
    `"Isabella Washington Lancaster III" - Dante `,
    `"When they hit three strikes though :heart_eyes:"`
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('View the top quotes in Pinecrest'),
    async execute(interaction) {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        await interaction.reply(random);
    },
};