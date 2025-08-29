const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { createRelationsSetupEmbed } = require('../../embeds/setup/relationsSetup');
const { createOperationsSetupEmbed } = require('../../embeds/setup/operationsSetup');
const { createStaffingSetupEmbed } = require('../../embeds/setup/staffingSetup');
const { createOwnershipSetupEmbed } = require('../../embeds/setup/ownershipSetup');
const { createPrivateOpsSetupEmbed } = require('../../embeds/setup/privateDiscussionSetup');
const { createPrivateStaffSetupEmbed } = require('../../embeds/setup/privateStaffingSetup');
const { createappealsSetupEmbed } = require('../../embeds/setup/appealsSetup'); 
const { createRoleApplicationsSetupEmbed } = require('../../embeds/setup/roleApplications');

const Developer_ID = '968999850203050014';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-tickets')
    .setDescription('Post a ticket embed for a specific department')
    .addStringOption(option => 
      option.setName('department')
        .setDescription('Choose which department embed to post')
        .setRequired(true)
        .addChoices(
          { name: 'Relations', value: 'relations' },
          { name: 'Operations', value: 'operations' },
          { name: 'Staffing', value: 'staffing' },
          { name: 'Ownership', value: 'ownership' },
          { name: 'Private Discussion', value: 'privateops'},
          { name: 'Private Staff', value: 'privatestaffing'},
          { name: 'Ops 2', value: 'roleapp' },
          { name: 'Appeals', value: 'appeals'}
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (interaction.user.id !== Developer_ID) {
      return interaction.reply({ content: 'Only the Bot Developer may run this command.', flags: 64 });
    }

    const sub = interaction.options.getString('department');
    let embedData;

    switch (sub) {
      case 'relations':
        embedData = createRelationsSetupEmbed();
        break;
      case 'operations':
        embedData = createOperationsSetupEmbed();
        break;
      case 'staffing':
        embedData = createStaffingSetupEmbed();
        break;
      case 'ownership':
        embedData = createOwnershipSetupEmbed();
        break;
      case 'privatestaffing':
        embedData = createPrivateStaffSetupEmbed();
        break;
      case 'privateops':
        embedData = createPrivateOpsSetupEmbed();
        break;
      case 'roleapp':
        embedData = createRoleApplicationsSetupEmbed();
        break;
      case 'appeals':
        embedData = createappealsSetupEmbed();
        break;
      default:
        return interaction.reply({ content: 'Invalid department selected', flags: 64 });
    }

    await interaction.channel.send({
      embeds: [embedData.embed],
      components: embedData.components
    });

    await interaction.reply({ content: 'Embed Posted', flags: 64 });
  }
};

