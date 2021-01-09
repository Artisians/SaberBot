const { MessageEmbed } = require("discord.js");
const xpSchema = require("../../schemas/xp-schema.js");
module.exports = {
  commands: ["showchatlevel"],
  expectedArgs: "<name>",
  minArgs: 0,
  maxArgs: 1,
  requiredRoles: ["Member"],
  callback: async (message) => {
    const { guild } = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);
    const result = await xpSchema.findOne({
      userId: user.id,
    });
    let { xp, level } = result;

    const embed = new MessageEmbed()
      .setAuthor(`${user.username} Level and XP`, user.displayAvatarURL())
      .addFields(
        {
          name: "User tag",
          value: user.tag,
        },
        {
          name: "Level",
          value: level,
        },
        {
          name: "XP",
          value: xp,
        },
        {
          name: "Joined server",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        }
      );
    message.channel.send(embed);
  },
};
