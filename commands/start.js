const { bold } = require("colorette");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  message.channel.send("test").catch(console.error);
  console.log(
    `${bold("Start Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }\nChannel ID: ${message.channel.id}\n`
  );
};

exports.name = "start";
