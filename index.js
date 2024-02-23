const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

// Declare client
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: true,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  partials: [
    "MESSAGE",
    "CHANNEL",
    "REACTION",
    "GUILD_MEMBER",
    "USER",
    "VOICE",
    "DIRECT_MESSAGES",
  ],
  intents:
    3276799 |
    GatewayIntentBits.MessageContent |
    GatewayIntentBits.DirectMessages,
});

// Make config available everywhere
client.config = config;

// Get Events
const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

client.commands = new Collection();

function readFilesRecursively(directory, fileList = []) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively read its files
      readFilesRecursively(filePath, fileList);
    } else {
      // If it's a file, add it to the list
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Directory containing commands
const commandsDir = "./commands";

// Get all JavaScript files recursively from the commands directory
const commandFiles = readFilesRecursively(commandsDir).filter((file) =>
  file.endsWith(".js")
);

// Get Total Commands, make it available through client, and log it
client.totalCommands = commandFiles.length;
console.log(`Total Commands: ${client.totalCommands}`);

for (const file of commandFiles) {
  const commandName = path.parse(file).name;
  const command = require(path.resolve(file));

  // Log every command being loaded
  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

client.login(config.token);
