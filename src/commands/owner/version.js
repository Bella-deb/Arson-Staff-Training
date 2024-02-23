const { bold } = require("colorette");
const Discord = require("discord.js");

const package = require("../../../package.json");
const config = require("../../config.json");
const allowedUsers = config.ownerID;

module.exports = {
  name: "version",
  aliases: ["v", "ver", "dependencies"],
}

module.exports.run = (client, message, args) => {
  try {
    if (!allowedUsers.includes(message.author.id)) {
      throw new Error("You are not authorized to use this command.");
    }

    const embed = new Discord.EmbedBuilder()
      .setTitle(`Bot & Dependency Version`)
      .setColor("Random").setDescription(`
        > **Versions**
        💽 **Bot Version:** ${package.version}
        💽 **Discord.JS Version:** ${package.dependencies["discord.js"]}
        💽 **Node Version:** ${process.version}
        💽 **Nodemon Version:** ${package.dependencies["nodemon"]}
        💽 **Colorette Version:** ${package.dependencies["colorette"]}
      `);

    // Send to Channel
    message.channel.send({ embeds: [embed] });

    console.log(
      `${bold("Version Command Used:")}\nUser: ${
        message.author.tag
      }\nUser ID: ${message.author.id}\nChannel ID: ${message.channel.id}\n`
    );
  } catch (error) {
    console.error("An error occurred:", error.message);
    message.channel.send(`An error occurred: ${error.message}`);
  }
};
