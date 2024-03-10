const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package
const Discord = require("discord.js"); // Importing the 'discord.js' library
const config = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
};

module.exports.run = async (client, message, args) => {
  console.log(
    `${bold("Help Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }\nChannel ID: ${message.channel.id}\n`
  );

  const helpEmbedForRegularUsers = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Arson Staff Training`,
      iconURL: `https://cdn.discordapp.com/avatars/1209283589519446127/1a3adea2ba6c81f3fe0a48d91cdd64b8.webp?size=1024&format=webp&width=0&height=256`,
    })
    .setTitle(`Commands:`)
    .setColor(`${config.embedColor}`).setDescription(`
        🗒️ **Information:**
        **..help** 
        Shows this help message 

        🚆 **Training:**
        **..start** 
        Start a training area with a specific user

        **..finish** 
        For the trannie to finish their training

        **..close** 
        For the trainer to close a training ticket

        🔧 **Utility**
        **..ping** 
        Pings the bot and shows bot and API latency

        **..botinfo** 
        Shows statistics about the bot
      `);

  const helpEmbedForOwners = new Discord.EmbedBuilder()
    .setAuthor({
      name: `Arson Staff Training`,
      iconURL: `https://cdn.discordapp.com/avatars/1209283589519446127/1a3adea2ba6c81f3fe0a48d91cdd64b8.webp?size=1024&format=webp&width=0&height=256`,
    })
    .setTitle(`Commands:`)
    .setColor("Random").setDescription(`
          > 🗒️ **Information:**
          **..help** 
          Shows this help message

          > 🚆 **Training:**
          **..start** 
          Start a training area with a specific user

          **..finish** 
          For the trannie to finish their training

          **..close** 
          For the trainer to close a training ticket
  
          > 🔧 **Utility:**
          **..ping** 
          Pings the bot and shows bot and API latency

          **..botinfo** 
          Shows statistics about the bot such as when the bot was created and server count

          > 👑 **Owner:**
          **..eval** 
          Execute JavaScript code

          **..version** 
          Shows bot & dependecy versions
        `);

  if (!config.ownerID.includes(message.author.id)) {
    message.channel.send({ embeds: [helpEmbedForRegularUsers] });
  } else if (config.ownerID.includes(message.author.id)) {
    message.channel.send({ embeds: [helpEmbedForOwners] });
  }
};
