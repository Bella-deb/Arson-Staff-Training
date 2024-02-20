const Discord = require("discord.js");

exports.run = (client, message, args) => {
  // Get the total number of users in all guilds the bot is in
  const totalUsers = client.users.cache.size;

  // Get the total number of servers the bot is in
  const totalServers = client.guilds.cache.size;

  // Send the statistics to the channel

  const embed = new Discord.EmbedBuilder()
  .setTitle(`Bot Stats`)
  .setColor('Random')
  .setDescription(`**Total Users:** ${totalUsers}\n**Total Servers:** ${totalServers}`);

  message.channel.send({ embeds: [embed] });
};

exports.name = "stats";
exports.description = "Displays bot statistics.";
