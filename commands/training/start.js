const { bold } = require("colorette");
const Discord = require("discord.js");
const allowedRoles = [];

const trainingChannelName = "testing-area";

exports.run = async (client, message, args) => {
  try {
    console.log(
      `${bold("Start Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
        message.author.id
      }\nChannel ID: ${message.channel.id}\n`
    );

    // if (message.member.roles.cache.has()) {
    //  console.log("Yay, the author of the message has the role!");
    // }

    // Check if command is ran inside a training channel
    if (message.channel.name === `${trainingChannelName}`) {
      return message.channel.send(
        "Command may not be ran inside of a testing area!"
      );
    }

    // Send a message to the channel indicating that a channel is being created
    await message.channel.send("Creating channel...").catch(console.error)
      .then(async (originalMessage) => {
        // After sending the message, create the channel
        const createdChannel = await message.guild.channels.create({
          name: `${trainingChannelName}`,
        }).catch(console.error);

        // Once the channel is created, send a message to it
        if (createdChannel) {
          const channelMessage = await createdChannel.send(
            `${message.author}, the channel has been created!`
          ).catch(console.error);

          originalMessage.edit("Channel created!").catch(console.error);
        }
      });

    // await message.channel.edit("Channel created!"); // Removed this line
  } catch (error) {
    console.error("An error occurred:", error.message);
    message.channel.send(`An error occurred!`);
  }
};


exports.name = "start"; 
