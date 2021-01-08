module.exports = {
  commands: ["stop"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const Discord = require("discord.js");
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send(
        "You must be in a voice channel to stop the music!"
      );
    }
    serverQueue.clear = [];
    serverQueue.connection.dispatcher.end();

    voiceChannel.leave();
    const leftVoiceConfirmationEmbed = new Discord.MessageEmbed()
      .setTitle("🎧 Saber 🎧")
      .setColor("RED")
      .setDescription(`✅ Audio stopped!`);
    await message.channel.send(leftVoiceConfirmationEmbed);
  },
};
