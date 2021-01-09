const { MessageEmbed } = require("discord.js");
const xpSchema = require("../../schemas/xp-schema.js");
module.exports = {
  commands: ["showtopchat"],
  expectedArgs: "<5,10,15>",
  minArgs: 0,
  maxArgs: 1,
  requiredRoles: ["Member"],
  callback: async (message, arguments) => {
    const number = arguments[0] || 5;
    const { guild } = message;
    const results = await xpSchema

      .find({})
      .sort({
        xp: -1,
      })
      .limit(number);
    const embed = new MessageEmbed().setAuthor(
      `Top ${number} chat leaderboard`
    );

    for (const result of results) {
      let { userId, xp, level } = result;
      const targetMember = (await guild.members.fetch()).get(userId);
      embed.addFields(
        {
          name: "User tag",
          value: targetMember,
        },
        {
          name: "Level",
          value: level,
        },
        {
          name: "XP",
          value: xp,
        }
      );
    }
    message.channel.send(embed);
  },
};
