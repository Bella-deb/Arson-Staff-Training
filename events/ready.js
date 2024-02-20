// Make Ready Event Text Look Pretty
const { bold } = require("colorette");

// Ready event for bot startup.
module.exports = (client) => {
  // Should Look Something Like:
  // 🚀 Logged in as Arson Staff Training#6419 || Bot ID: 1209283589519446127
  // 🚀 Ready to serve in 14 channels on 2 servers, for a total of 14 users.
  console.log(
    `🚀 Logged in as ${bold(client.user.tag)} || Bot ID: ${bold(
      client.user.id
    )}\n🚀 Ready to serve in ${bold(
      client.channels.cache.size
    )} channels on ${bold(
      client.guilds.cache.size
    )} servers, for a total of ${bold(client.users.cache.size)} users.`
  );

  // Makes activity: "Watching staff members!"
  client.user.setPresence({
    activities: [{ type: 3, name: "staff members!" }],
    status: "online",
  });
};
