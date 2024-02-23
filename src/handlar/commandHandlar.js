const { bold } = require("colorette"); // Importing the 'bold' function from the 'colorette' package

module.exports = async (client) => {

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
  console.log(`Attempting to load command ${bold(commandName)}`);
  client.commands.set(commandName, command);
}
}