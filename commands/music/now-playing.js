module.exports = {
  commands: ["nowplaying", "np"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const Discord = require("discord.js");
    if (!serverQueue) return message.channel.send("There is nothing playing.");
    const nowPlayingEmbed = new Discord.MessageEmbed()
      .setTitle("🎧 Saber 🎧")
      .setColor("BLUE")
      .setDescription(`🎶 Now playing: ${serverQueue.songs[0].title}`);
    message.channel.send({
      embed: nowPlayingEmbed,
    });
  },
};
