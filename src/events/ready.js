// Make Ready Event Text Look Pretty
const { bold } = require("colorette");
const { ActivityType } = require("discord.js");

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

  const totalUsers = client.users.cache.size;
  const totalChannels = client.channels.cache.size;
  const totalServers = client.guilds.cache.size;

  const activities = [
    "staff members!",
    "staff trainings!",
    "ily karma.deb - Bella <3",
    "ily magicvalkyrie - Bella <3",
    "made with love by @bella.deb!",
    `${totalUsers} users!`,
    "trans rights are human rights!",
    `${totalChannels} channels!`,
    `${totalServers} servers!`,
    "you matter!",
    "don't give up!",
  ];

  let currentActivityIndex = 0;

  setInterval(() => {
    currentActivityIndex = (currentActivityIndex + 1) % activities.length;
    const newActivity = activities[currentActivityIndex];
    const changePresence = client.user.setPresence({
      activities: [{ type: ActivityType.Watching, name: newActivity }],
      status: "online",
    });

    if (!changePresence) {
      return console.log("Activity change failed!");
    }

    console.log(`Activity changed to \"${newActivity}\"!`);
  }, 5000);
};
