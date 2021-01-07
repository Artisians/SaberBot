module.exports = {
  commands: ["skip"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    if (!serverQueue)
      return message.channel.send(
        "There is nothing playing that I could skip for you."
      );
    serverQueue.connection.dispatcher.end("Skip command has been used!");
    return message.channel.send("Song Skipped!");
  },
};
