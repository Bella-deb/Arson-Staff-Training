const Discord = require("discord.js");
const config = require("../../config.json");
const trainingConfig = require("../../training.json");
const { DateTime } = require("luxon");

module.exports = {
  name: "finish",
  aliases: ["f"],
};

module.exports.run = async (client, message, args) => {
  try {
    const logChannel = client.channels.cache.get(
      trainingConfig.trainingLogChannel
    );

    const dateFinished = DateTime.now()
      .setZone("America/New_York")
      .toFormat("dd MMMM, yyyy HH:mm:ss");

    const logEmbed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Arson Staff Training`,
        iconURL: `https://cdn.discordapp.com/avatars/1209283589519446127/1a3adea2ba6c81f3fe0a48d91cdd64b8.webp?size=1024&format=webp&width=0&height=256`,
      })
      .setTitle(`Training Finished`)
      .setColor(`DarkRed`)
      .setDescription(`A trainee has finished their training!`)
      .addFields(
        {
          name: "Trainee Information:",
          value: `❤️ Trainee: ${message.author}
💳 Trainee ID: ${message.author.id}`,
        },
        {
          name: "Miscellaneous Information:",
          value: `📅 Date Finished: \`${dateFinished}\`
🌻 Channel: <#${message.channel.id}>`,
        }
      );

    if (!message.channel.name.includes(`${message.author.id}-training-area`)) {
      return message.channel.send(
        "You are not authorized to use this command."
      );
    } else if (
      message.channel.name.includes(`${message.author.id}-training-area`)
    ) {
      const trainerID = args[0];

      // Make sure a user is providing an argument
      if (trainerID === undefined) {
        return message.channel.send(`Please provide your trainer's ID!`);
      }

      // Check if the first argument is a number
      const numberCheck = parseInt(trainerID);

      if (isNaN(numberCheck)) {
        return message.channel.send(
          `That is not a number! Please provide your trainer's Discord User ID!`
        );
      }

      // Make sure the first argument given
      if (trainerID.length < 17) {
        return message.channel.send(
          `A user ID must be at LEAST 17 characters long! Please provide a correct user ID of your trainer!`
        );
      }

      await message.author.send(
        `Thank you for answering the questions, your trainer will respond soon with your grade. If you pass, this ticket will be closed once the trainer responds.
      
In the meantime, the training ticket will be locked to overview your questions. Thank you for your patience.
-- Arson Staff Training Team`
      );

      try {
        await message.channel.permissionOverwrites.edit(message.author.id, {
          ViewChannel: false,
          SendMessages: false,
        });

        await message.channel.send(
          `<@${trainerID}>\nPermissions have been removed for ${message.author} to view and send messages in this channel.\n\n${message.author} has finished answering the questions, please grade them and DM them with the grade.`
        );
      } catch (error) {
        console.error(`Error setting permissions: ${error.message}`);
        await message.channel.send(
          `An error occurred while modifying permissions. Please try again or contact the server administrator.`
        );
      }

      const logMessage = await logChannel.send({
        embeds: [logEmbed],
        content: "A user has finished training!",
      });
    }
  } catch (error) {
    if (error.code === "ETIMEDOUT") {
      console.log("Timeout error occurred:", error.message);
      message.channel.send(`The command timed out. Please try again later.`);
    } else {
      console.log("An error occurred:", error);
      message.channel.send(`An error occurred!`);
    }
  }
};
