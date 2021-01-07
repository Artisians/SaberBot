const warnSchema = require("../../schemas/warn-schema");

module.exports = {
  commands: "clearwarn",
  minArgs: 1,
  expectedArgs: "<Target user's @ or ID>",
  requiredRoles: ["Member"],
  callback: async (message, arguments) => {
    const target = message.mentions.users.first();
    const Discord = require("discord.js");

    if (!target) {
      message.reply("Please specify someone to clear warnings!");
      return;
    }

    arguments.shift();

    const userId = target.id;

    await warnSchema.deleteMany({
      userId: userId,
    });

    const unwarnConfirmationEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`✅ ${target} warnings have been successfully cleared!`);
    message.channel.send({
      embed: unwarnConfirmationEmbed,
    });
  },
};
