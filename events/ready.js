module.exports = (client) => {
  console.log(
    `Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );
  console.log(`Logged in as ${client.user.tag} || Bot ID: ${client.user.id}`);
  client.user.setPresence({
    activities: [{ type: 3, name: "staff members!" }],
    status: "online",
  });
};
