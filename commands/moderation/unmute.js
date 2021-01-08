const muteSchema = require("../../schemas/mute-schema");

module.exports = {
  commands: ["unmute"],
  minArgs: 1,
  expectedArgs: ["<Target's @ or ID"],
  requiredRoles: ["Member"],
  callback: async (message, args) => {
    const Discord = require("discord.js");
    const { guild } = message;
    let id = "";

    const target = message.mentions.users.first();
    if (target) {
      id = target.id;
    } else {
      id = args[0];
    }

    const result = await muteSchema.updateOne(
      {
        guildID: guild.id,
        userID: id,
        active: true,
      },
      {
        active: false,
      }
    );

    if (result.nModified === 1) {
      const mutedRole = guild.roles.cache.find((role) => {
        return role.name === "Muted";
      });

      if (mutedRole) {
        const guildMember = guild.members.cache.get(id);
        guildMember.roles.remove(mutedRole);
      }

      const unmuteConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ <@${id}> has been successfully unmuted!`);
      return message.channel.send({
        embed: unmuteConfirmationEmbed,
      });
    } else {
      message.reply(`${id} is not muted!`);
    }
  },
};
