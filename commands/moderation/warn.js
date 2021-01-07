const warnSchema = require("../../schemas/warn-schema");

module.exports = {
  commands: "warn",
  minArgs: 2,
  expectedArgs: "<Target user's @ or ID>",
  requiredRoles: ["Member"],
  callback: async (message, arguments) => {
    const target = message.mentions.users.first();
    const Discord = require("discord.js");

    if (!target) {
      message.reply("Please specify someone to warn.");
      return;
    }

    arguments.shift();

    const guildId = message.guild.id;
    const userId = target.id;
    const reason = arguments.join(" ");

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    };

    await warnSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    );

    const warnConfirmationEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`✅ ${target} has been successfully warned!`);
    message.channel.send({
      embed: warnConfirmationEmbed,
    });
  },
};
