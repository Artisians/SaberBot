module.exports = {
  commands: ["ban"],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ["Member"],
  callback: async (message, args, text) => {
    const target = args[0];
    const Discord = require("discord.js");
    if (!target) {
      message.reply("Please sepecify somone to ban!");
      return;
    } else {
      message.guild.members.ban(target);
      const banConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`✅ ${target} has been successfully banned!`);
      message.channel.send({
        embed: banConfirmationEmbed,
      });
    }
  },
};
