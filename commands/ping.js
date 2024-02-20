exports.run = (client, message, args) => {
  message.channel.send("Pong!").catch(console.error);
};

exports.name = "ping";
exports.aliases = ["p"]; // Add the alias "pong" to the command
