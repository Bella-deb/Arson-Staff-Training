const Discord = require("discord.js");

exports.run = (client, message, args) => {
  // Get the total number of users in all guilds the bot is in
  const totalUsers = client.users.cache.size;

  // Get the total number of servers the bot is in
  const totalServers = client.guilds.cache.size;

  // Get when bot was created
  const creationTimestamp = `<t:${parseInt(
    client.user.createdTimestamp / 1000
  )}:R>`;

  // Send the statistics to the channel

  const embed = new Discord.EmbedBuilder()
    .setTitle(`Bot Stats`)
    .setColor("Random")
    .setDescription(
      `> **General Information**
🗓️ **Created:** ${creationTimestamp}
📒 **Bot Id:** \`${client.user.id}\`

> **Statistics**
👥 **Total Users:** ${totalUsers}
🗂️ **Total Servers:** ${totalServers}

> **Misc**
🏷️ **Total Commands:** ${client.totalCommands}`
);

  message.channel.send({ embeds: [embed] });
};

exports.name = "botinfo";
exports.description = "Displays bot statistics.";
