const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const Discord = require("discord.js"); // Importing the 'discord.js' library
const config = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
}

module.exports.run = async (client, message, args) => {
  console.log(
    `${bold("Help Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }\nChannel ID: ${message.channel.id}\n`
  );

  const helpEmbedForRegularUsers = new Discord.EmbedBuilder()
    .setTitle(`Help Command:`)
    .setColor(`${config.embedColor}`)
    .setDescription(`
        ## **Commands:**
        > **Information:**
        **..help:** Shows this help message. 

        > **Training:**
        **..start:** Start a training area with a specific user.
        **..finish:** For the trannie to finish their training.
        **..close:** For the trainer to close a training ticket.

        > **Utility:**
        **..ping:** Pings the bot and shows bot and API latency.
        **..botinfo:** Shows statistics about the bot.
      `);

  const helpEmbedForOwners = new Discord.EmbedBuilder()
    .setTitle(`Help Command:`)
    .setColor("Random").setDescription(`
          ## **Commands:**
          > **Information:**
          **..help:** Shows this help message. 

          > **Training:**
          **..start:** Start a training area with a specific user.
          **..finish:** For the trannie to finish their training.
          **..close:** For the trainer to close a training ticket.
  
          > **Utility:**
          **..ping:** Pings the bot and shows bot and API latency.
          **..botinfo:** Shows statistics about the bot.

          > **Owner:**
          **..eval:** Eval something. 
          **..version:** Shows bot version and dependecy versions.
        `);

  if (!config.ownerID.includes(message.author.id)) {
    message.channel.send({ embeds: [helpEmbedForRegularUsers] });
  } else if (config.ownerID.includes(message.author.id)) {
    message.channel.send({ embeds: [helpEmbedForOwners] });
  }
};
