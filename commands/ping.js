const { bold } = require("colorette");

exports.run = (client, message, args) => {
  message.channel.send("Pong!").catch(console.error);

  console.log(`${bold('Ping Command Used:')}\nUser: ${message.author.tag}\nUser ID: ${message.author.id}`)
};

exports.name = "ping";
exports.aliases = ["p"]; // Add the alias "pong" to the command
