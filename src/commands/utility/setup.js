const Discord = require("discord.js");

const config = require("../../config.json");
const allowedUsers = config.ownerID;

module.exports = {
  name: "setup",
  aliases: ["s"],
};

module.exports.run = async (client, message, args) => {
  try {
    if (!allowedUsers.includes(message.author.id)) {
      return message.channel.send(
        "You are not authorized to use this command."
      );
    } else if (allowedUsers.includes(message.author.id)) {
      const trainingCategory = await message.guild.channels
        .create({
          name: "৻ TRAINING ⋆˚｡⁺⋆",
          type: Discord.ChannelType.GuildCategory,
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: "1209983942216908932",
              allow: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
          ],
        })
        .then(message.channel.send("Training category created!"));

      const trainingLogChannel = await message.guild.channels
        .create({
          name: "💢・traininglogs",
          type: Discord.ChannelType.GuildText,
          topic: "This is the channel for logging training tickets!",
          parent: trainingCategory.id,
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: "1209983942216908932",
              allow: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
          ],
        })
        .then(message.channel.send("Training logs channel created!"));
    }
  } catch (error) {
    if (error.code === "ETIMEDOUT") {
      // Check for timeout error code
      console.log("Timeout error occurred:", error.message);
      message.channel.send(`The command timed out. Please try again later.`);
    } else {
      console.log("An error occurred:", error);
      message.channel.send(`An error occurred!`);
    }
  }
};
