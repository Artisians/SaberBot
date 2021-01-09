const { MessageEmbed } = require("discord.js");
module.exports = {
  commands: ["whois", "userInfo"],
  expectedArgs: "<name>",
  minArgs: 0,
  maxArgs: 1,
  requiredRoles: ["Member"],
  //Try arguments
  callback: async (message) => {
    const { guild, Channel } = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);
    const embed = new MessageEmbed()
      .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
      .addFields(
        {
          name: "User tag",
          value: user.tag,
        },
        {
          name: "Is bot",
          value: user.bot,
        },
        {
          name: "Nickname",
          value: member.nickname || "None",
        },
        {
          name: "Joined server",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: "Joined Discord",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: "Role count",
          value: member.roles.cache.size - 1,
        }
      );
    message.channel.send(embed);
  },
};
