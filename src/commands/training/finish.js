const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "finish",
  aliases: ["f"],
};

module.exports.run = async (client, message, args) => {
  if (!message.channel.name.includes(message.author.id)) {
    return message.channel.send("You are not authorized to use this command.");
  }

  if (!message.channel.name === `${message.author.id}-testing-area`) {
    return message.channel.send("You may not run this command here.");
  } else if (message.channel.name === `${message.author.id}-testing-area`) {
    const trainerID = args[0];


    // Make sure a user is providing an argument
    if (trainerID === undefined) {
      return message.channel.send(`Please provide your trainer's ID!`);
    }
    
    // Check if the first argument is a number
    const numberCheck = parseInt(trainerID);

    if (isNaN(numberCheck)) {
      return message.channel.send(`That is not a number! Please provide your trainer's Discord User ID!`);
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
  }
};
