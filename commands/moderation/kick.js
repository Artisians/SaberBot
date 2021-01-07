module.exports = {
  commands: ["kick"],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ["Member"],
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first();
    const Discord = require("discord.js");
    if (!target) {
      message.reply("Please sepecify somone to kick!");
      return;
    } else {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.kick();
      const kickConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`✅ ${target} has been successfully kicked!`);
      message.channel.send({
        embed: kickConfirmationEmbed,
      });
    }
  },
};
