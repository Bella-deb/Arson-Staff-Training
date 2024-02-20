// Make Ready Event Text Look Pretty
const { blue, bold, underline } = require("colorette");

// Ready event for bot startup.
module.exports = (client) => {
  // Should Look Something Like:
  // Ready to serve in 14 channels on 2 servers, for a total of 14 users.
  // Logged in as Arson Staff Training#6419 || Bot ID: 1209283589519446127
  console.log(
    `🚀 Logged in as ${bold(client.user.tag)} || Bot ID: ${client.user.id}\n🚀 Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );

  // Makes activity: "Watching staff members!"
  client.user.setPresence({
    activities: [{ type: 3, name: "staff members!" }],
    status: "online",
  });
};
