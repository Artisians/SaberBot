module.exports = {
  commands: ["gend"],
  minArgs: 0,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const Discord = require("discord.js");

    message.delete().then(() => {
      const { channel } = message;

      channel.messages.fetch({ limit: 1 }).then(async (messages) => {
        message = messages.first();

        if (!message) {
          channel.send("There are no messages!");
          return;
        }

        const { users } = await message.reactions.cache.first().fetch();
        const reactionUsers = await users.fetch();

        const possibleWinners = reactionUsers.array().filter((user) => {
          return !user.bot;
        });

        const winner =
          possibleWinners[Math.floor(Math.random() * possibleWinners.length)];

        const endWinnerConfirmation = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`✅ <@${winner.id}> has won the giveaway!`);
        message.channel.send({
          embed: endWinnerConfirmation,
        });
      });
    });
  },
};
