const mongo = require("../../mongo");
const warnSchema = require("../../schemas/warn-schema");

module.exports = {
  commands: "warn",
  minArgs: 2,
  expectedArgs: "<Target user's @> <reason>",
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

    await mongo().then(async (mongoose) => {
      try {
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
      } finally {
        mongoose.connection.close();
      }
    });

    const warnConfirmationEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`✅ ${target} has been successfully warned!`);
    message.channel.send({
      embed: warnConfirmationEmbed,
    });
  },
};
