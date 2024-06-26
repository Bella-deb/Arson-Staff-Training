const Discord = require("discord.js");
const { DateTime } = require("luxon");
const fs = require("fs");
const trainingConfig = require("../../training.json");

module.exports = {
  name: "close",
  aliases: ["c", "done"],
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
      .setTitle(`Training Closed`)
      .setColor(`DarkRed`)
      .setDescription(`A user has closed a training thread.`)
      .setFields(
        {
          name: "Trainer Information:",
          value: `❤️ Trainer: ${message.author}
      💳 Trainer ID: ${message.author.id}`,
        },
        {
          name: "Miscellaneous Information:",
          value: `📅 Date Closed: ${dateFinished}`,
        }
      );

    if (!message.channel.name.includes("training")) {
      return message.channel.send(`This command may not be run here!`);
    } else {
      // Get the current channel where the command was sent
      const channel = await message.channel;

      if (!(channel instanceof Discord.TextChannel)) {
        throw new Error(`This command can only be used in text channels.`);
      }

      // Fetch the last 150 messages from the channel, considering limitations
      const messages = await channel.messages.fetch({ limit: 100 });
      let additionalMessages = [];

      maxMessages = 100;

      // Check if more messages are needed to reach the maximum
      if (messages.size < maxMessages) {
        const beforeId = await messages.last().id;
        const additionalFetch = await channel.messages.fetch({
          limit: maxMessages - messages.size,
          before: beforeId,
        });
        additionalMessages = await additionalFetch.reverse(); // Reverse to maintain chronological order
      }

      // Combine messages from both fetches
      const combinedMessages = await messages.concat(additionalMessages);

      // Create a temporary filename
      let filename = `message_log_${message.channel.name}`;

      if (!fs.existsSync("./logs")) {
        fs.mkdirSync("./logs", { recursive: true }); // Create directories recursively
      }

      fs.writeFileSync(
        `./logs/${filename}.txt`,
        `This TXT file was logging the channel: #${message.channel.name}.\nTHIS DOES NOT LOG MESSAGES FROM BOTS!\n\n` + // Prepend channel name with two newlines
          combinedMessages
            .filter((message) => !message.author.bot) // Filter out bot messages
            .map(
              (message) =>
                `${
                  message.author.tag
                } (${message.createdAt.toLocaleString()}):\n${
                  message.content
                }\n\n`
            )
            .join("")
      );

      // Send the file as an attachment in a DM
      const bella = await client.users.fetch("860974614905094144");
      const hailey = await client.users.fetch("1060069099662749696");

      const trainingLogChannel = await message.guild.channels.fetch(
        `${trainingConfig.trainingLogChannel}`
      );

      message.author
        .send({
          files: [`./logs/${filename}.txt`], // Attach the generated file
          content: `Here's the message log for #${channel.name}!`,
          embeds: [logEmbed],
        })
        .then(
          bella
            .send({
              files: [`./logs/${filename}.txt`], // Attach the generated file
              content: `Here's the message log for #${channel.name}!`,
              embeds: [logEmbed],
            })
            .then(console.log("File sent to Bella!"))
        )
        .then(
          trainingLogChannel.send({
            files: [`./logs/${filename}.txt`],
            content: `A user has a training thread! (#${channel.name})`,
            embeds: [logEmbed],
          })
        )
        .then(() => {
          console.log(`File sent to ${message.author.tag}`);
        })
        .catch((error) => {
          console.error(`Error sending file: ${error.message}`);
          message.author.send(
            "An error occurred while sending the message log. Please try again later."
          );
        });

      await message.channel
        .delete()
        .then(
          message.author.send(
            "Training channel has succesfully been deleted. If you have not already, please send the trainee their grade."
          )
        );
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
