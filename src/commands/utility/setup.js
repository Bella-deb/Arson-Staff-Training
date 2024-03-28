const Discord = require("discord.js");
const fs = require("fs");

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
      const categoryNameLookingFor = "৻ TRAINING ⋆˚｡⁺⋆";
      const channelNameLookingFor = "💢・traininglogs";
      const roleNameLookingFor = "🌹・Training Permissions";

      const guild = client.guilds.cache.get(`${message.guild.id}`);

      const channels = await guild.channels.fetch();

      const matchingCategory = channels.filter(
        (channel) =>
          channel instanceof Discord.CategoryChannel &&
          channel.name
            .toLowerCase()
            .includes(categoryNameLookingFor.toLowerCase())
      );

      if (matchingCategory.size > 0) {
        return message.channel.send(
          `This server already has a training category!`
        );
      }

      const matchingChannel = channels.filter(
        (channel) =>
          channel instanceof Discord.GuildChannel &&
          channel.name
            .toLowerCase()
            .includes(channelNameLookingFor.toLowerCase())
      );

      if (matchingChannel.size > 0) {
        return message.channel.send(
          `This server already has a training channel!`
        );
      }

      const roleCheck = await message.guild.roles.cache.forEach((role) => {
        if (role.name.includes("🌹・Training Permissions")) {
        return message.channel.send(`This server already has a training role!`)
        }
        });

      const trainingRole = await message.guild.roles
        .create({
          name: "🌹・Training Permissions",
          color: `#D70040`,
        })
        .then(`Training permissions role created!`);

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
              id: trainingRole.id,
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
              id: trainingRole.id,
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
              ],
            },
          ],
        })
        .then(message.channel.send("Training logs channel created!"));

      fs.readFile(
        "/home/bella/code/Discord Bots/Arson Staff Training/src/training.json",
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          // Parse the JSON data
          const jsonData = JSON.parse(data);

          // Modify the desired value
          jsonData.trainingCategory = trainingCategory.id;
          jsonData.trainingLogChannel = trainingLogChannel.id;
          jsonData.trainingPermissionRole = trainingRole.id;

          // Write the updated data back to the file
          fs.writeFile("training.json", JSON.stringify(jsonData), (err) => {
            if (err) {
              console.error(err);
              return;
            }

            console.log("JSON file updated successfully!");
          });
        }
      );
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
