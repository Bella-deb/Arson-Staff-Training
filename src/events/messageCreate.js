const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  console.log(
    `${bold("Command Used:")}\nUser: ${message.author.tag}\nUser ID: ${
      message.author.id
    }\nChannel ID: ${message.channel.id}\n`
  );

  // Make sure messages don't contain bot token
  if (message.content.includes("client.token")) {
    return message.channel.send(`Nice Try, won't be that easy!`);
  }

  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
