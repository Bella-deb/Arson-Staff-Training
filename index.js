const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const config = require('./config.json');

const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: true,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
      disableMentions: true,
      repliedUser: true,
    },
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

  client.login(config.token);
