module.exports = {
  commands: ["gstart"],
  minArgs: 1,
  expectedArgs: ["<Emoji>"],
  requiredRoles: ["Member"],
  callback: async (message, args, text) => {
    message.delete().then(() => {
      const { guild, channel } = message;

      channel.messages.fetch({ limit: 1 }).then((messages) => {
        message = messages.first();

        if (!message) {
          channel.send("There are no messages!");
          return;
        }

        if (text.includes(':')) {
          const split = text.split(':');
          const emojiName = split[1];
          text = guild.emojis.cache.find((emoji) => {
            return emoji.name === emojiName;
          });
        }

        message.react(text);
      });
    });
  },
};
