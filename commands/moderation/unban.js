module.exports = {
  commands: ["unban"],
  minArgs: 1,
  expectedArgs: "<Target user's @ or ID>",
  requiredRoles: ["Member"],
  callback: async (message, args, text) => {
    const target = args[0];
    const Discord = require("discord.js");
    if (!target) {
      message.reply("Please sepecify somone to unban!");
      return;
    } else {
      message.guild.members.unban(target);
      const unbanConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ ${target} has been successfully unbanned!`);
      message.channel.send({
        embed: unbanConfirmationEmbed,
      });
    }
  },
};
