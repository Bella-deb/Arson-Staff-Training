const { codeBlock } = require("@discordjs/builders");

const config = require("../../config.json");
const allowedUsers = config.ownerID;

async function clean(client, text) {
  if (text && text.constructor.name == "Promise") text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));

  text = text.replaceAll(client.token, "[REDACTED]");

  return text;
}

module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
}

module.exports.run = async (client, message, args, level) => {
  if (!allowedUsers.includes(message.author.id)) {
    return message.channel.send("You are not authorized to use this command.");
  }

  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const cleaned = await clean(client, evaled);
    if (cleaned.length > 2000) {
      return message.channel.send("Error: Message is over 2000 characters.");
    }
    message.channel.send(`**Output:**\n${codeBlock("js", cleaned)}`);
  } catch (err) {
    const errorMessage = `Error:\n\`\`\`js\n${err}\n\`\`\``;
    message.channel.send(errorMessage);
    console.error(`Eval command error message: ${errorMessage}`);
  }
  console.log(`${message.author.tag} has used the eval command!`);
};

exports.name = "eval";

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: "Bot Owner",
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]",
};
