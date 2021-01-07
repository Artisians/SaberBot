module.exports = {
  commands: ["queued", "q"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const Discord = require("discord.js");
    if (!serverQueue) {
      return message.channel.send("There is nothing queued!");
    } else {
      const queuedEmbed = new Discord.MessageEmbed()
        .setTitle("🎧 Queue 🎧")
        .setColor("BLUE")
        .setDescription(
          `${serverQueue.songs
            .map((song) => `**-** ${song.title}`)
            .join("\n\n")}`
        );
      return message.channel.send({
        embed: queuedEmbed,
      });
    }
  },
};
