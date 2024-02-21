const { bold } = require("colorette");
const Discord = require("discord.js");
const allowedRoles = []

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

    if (message.channel.name === "testing-area") {
      return message.channel.send('Command may not be ran inside of a testing area!')
    }

    const createdChannel = await message.guild.channels.create({
      name: "testing-area",
    });
    await message.channel.send("Creating channel...").catch(console.error);

    const channelMessage = await createdChannel.send(
      `${message.author}, the channel has been created!`
    );

    await message.channel.edit("Channel created!");

  } catch (error) {
    console.error("An error occurred:", error.message);
    message.channel.send(`An error occurred!`);
  }

};

exports.name = "start";
