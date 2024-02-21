const { bold } = require("colorette");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const msg = await message.channel.send("Pinging...");

  const pingEmbed = new Discord.EmbedBuilder().setTitle(
    "Ping Command:"
  ).setDescription;
  if (client.readyAt) {
    const botLatency = msg.createdTimestamp - message.createdTimestamp;
    const apiLatency = client.ws.ping;

    const pingEmbed = new Discord.EmbedBuilder()
      .setTitle("Ping Command:")
      .setFooter(`Created by: ${client.users.cache.get("860974614905094144").tag}`)
      .setDescription(
        `## Bot Latency: ${botLatency}ms\n\n## API Latency: ${apiLatency}ms`
      );

    msg.delete();
    message.channel.send({ embeds: [pingEmbed] }).catch(console.error);
  } else {
    console.log("Bot is not ready yet. Waiting for the ready event...");
  }

  console.log(
    `${bold("Ping Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }`
  );
};

exports.name = "ping";
exports.aliases = ["p"]; // Add the alias "pong" to the command
