module.exports = {
  commands: ["stop"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const voiceChannel = message.member.voice.channel;
    const Discord = require("discord.js");

    if (!voiceChannel) {
      return message.channel.send(
        "You must be in a voice channel to stop the music!"
      );
    }
    voiceChannel.leave();
    const leftVoiceConfirmationEmbed = new Discord.MessageEmbed()
      .setTitle("🎧 Saber 🎧")
      .setColor("RED")
      .setDescription(`✅ Audio stopped!`);
    let leftVoiceConfirmation = await message.channel.send(
      leftVoiceConfirmationEmbed
    );
  },
};
