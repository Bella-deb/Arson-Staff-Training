const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("node:path");
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

const commands = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Get Total Commands, make it avaiable through client, and log it
client.totalCommands = commands.length;
console.log(`Total Commands: ${client.totalCommands}`);

for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command, client);
}

client.login(config.token);
