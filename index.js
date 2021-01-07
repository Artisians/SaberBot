const Discord = require("discord.js");
const client = new Discord.Client();

const mongo = require("./mongo");
const config = require("./config.json");
const loadCommands = require("./commands/load-commands");
const commandBase = require("./commands/command-base");
const loadFeatures = require("./features/load-features");

client.on("ready", async () => {
  console.log("The bot is ready!");
  await mongo();

  commandBase.loadPrefixes(client);
  loadCommands(client);
  loadFeatures(client);
});

client.login(config.token);
