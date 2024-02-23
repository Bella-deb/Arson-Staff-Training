const Discord = require("discord.js");

module.exports = {
  name: "finish",
  aliases: ["f"],
}

module.exports.run = async (client, message, args) => {
  if (!message.channel.name.includes(message.author.id)) {
    return message.channel.send("You are not authorized to use this command.");
  }

  if (!message.channel.name === `${message.author.id}-testing-area`) {
    return message.channel.send("You may not run this command here.");
  } else if (message.channel.name === `${message.author.id}-testing-area`) {
    message.author.send(
      `Thank you for answering the questions, your trainer will respond soon with your grade. If you pass, this ticket will be closed once the trainer responds.`
    );

    message.channel.permissionOverwrites
      .set([
        {
          id: message.author.id,
          deny: [
            Discord.PermissionsBitField.Flags.ViewChannel,
            Discord.PermissionsBitField.Flags.SendMessages,
          ],
        },
      ])
      .then(
        message.channel.send(
          "Permissions has been removed from the trannie to view the channel.\n"
        )
      );

    message.channel.send(
      `The trannie has finished answering the questions, please grade them and respond with a grade.`
    );
  }
};