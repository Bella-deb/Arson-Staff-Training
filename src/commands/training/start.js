const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "start",
  aliases: ["s"],
};

module.exports.run = async (client, message, args) => {
  try {
    const member = message.member.roles.cache.has("1209983942216908932");
    const trainedUserID = args[0];

    // Check if user has specified roles
    if (!member) {
      return await message.channel.send(
        "You are not authorized to use this command."
      );
    } else if (member) {
      if (trainedUserID === undefined) {
        return message.channel.send(`Please provide an argument!`);
      }

      // Make sure user ID is 17 characters long.
      if (trainedUserID.length < 17) {
        return message.channel.send(
          `A user ID must be at LEAST 17 characters long! Please provide a correct user ID!`
        );
      }

      // Check if trainedUserID is a number

      const numberCheck = parseInt(trainedUserID);

      if (isNaN(numberCheck)) {
        return message.channel.senFd(`User ID is not a number!`);
      }

      // Check if the user is training themselves.
      if (trainedUserID === message.author.id) {
        return message.channel.send(`You may not train yourself!`);
      }

      // Check if the first arguement has a value.
      if (!trainedUserID) {
        return message.channel.send(`Please mention a valid user!`);
      }

      // Check if user is mentioning a user instead of using a user ID
      if (trainedUserID.includes(`<@`)) {
        return message.channel.send(
          `Please do not mention the user, use a user ID!`
        );
      }

      // Check if command is ran inside a training channel
      if (message.channel.name === "training-area") {
        return message.channel.send(
          "Command may not be ran inside of a training area!"
        );
      }

      const channelNameLookingFor = trainedUserID;

      const guild = client.guilds.cache.get(`${message.guild.id}`);

      const channels = await guild.channels.fetch();

      const matchingChannels = channels.filter(
        (channel) =>
          channel instanceof Discord.GuildChannel &&
          channel.name
            .toLowerCase()
            .includes(channelNameLookingFor.toLowerCase())
      );

      if (matchingChannels.size > 0) {
        return message.channel.send(`This user already has a training opened!`);
      }

      // Send a message to the channel indicating that a channel is being created
      await message.channel
        .send("Creating channel...")
        .then(async (originalMessage) => {
          // After sending the message, create the channel
          const createdChannel = await message.guild.channels.create({
            name: `${`${trainedUserID}-training-area`}`,
            topic: "Channel used for Modmail training!",
            parent: "1210368758325968917",
            permissionOverwrites: [
              {
                id: client.user.id,
                allow: [
                  Discord.PermissionsBitField.Flags.SendMessages,
                  Discord.PermissionsBitField.Flags.ViewChannel,
                ],
              },
              {
                id: message.author.id,
                allow: [
                  Discord.PermissionsBitField.Flags.SendMessages,
                  Discord.PermissionsBitField.Flags.ViewChannel,
                ],
              },
              {
                id: trainedUserID,
                allow: [
                  Discord.PermissionsBitField.Flags.SendMessages,
                  Discord.PermissionsBitField.Flags.ViewChannel,
                ],
              },
              {
                id: message.guild.id,
                deny: [Discord.PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });

          const trainingEmbed = new Discord.EmbedBuilder()
            .setTitle("Training Information:")
            .setColor(`${config.embedColor}`)
            .setDescription(
              `Hello <@${trainedUserID}>, Welcome to Arson's Modmail training! Your trainer is <@${message.author.id}>.\n\nPlease make sure to read over <#1206966054174072862> before answering the questions below. Copy the codeblock then answer the questions, goodluck!\n\n`
            )
            .addFields({
              name: `Questions:`,
              value: [
                `\`\`\`1. How do you reply to a modmail thread?
2. How do you close a Modmail thread?
3. How do you add a user to a modmail thread?
4. How should you greet a user?
4. How should you end a ticket?
5. In your own words, explain the purpose of a Modmail bot.

[ SCENARIOS ]

6. What would you do in the situation where a user wants to report somebody?
7. What would you do if somebody asked to partner?
8. What would you do if a user is abusing the Modmail?
Once you are finished, please run the ..finish command.\`\`\``,
              ].join("\n"),
            });

          createdChannel
            .send(`<@${message.author.id}> <@${trainedUserID}>`)
            .then(createdChannel.send({ embeds: [trainingEmbed] }));

          // Once the channel is created, edit the message saying it was created
          if (createdChannel) {
            await originalMessage.edit("Channel created!");
          }
        });
    }
  } catch (error) {
    if (error.code === 'ETIMEDOUT') { // Check for timeout error code
      console.log("Timeout error occurred:", error.message);
      message.channel.send(`The command timed out. Please try again later.`);
    } else {
      console.log("An error occurred:", error);
      message.channel.send(`An error occurred!`);
    }
}
};
