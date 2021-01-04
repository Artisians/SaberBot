const muteSchema = require("../../schemas/mute-schema");

const reasons = {
  SPAMMING: 5,
  ADVERTISING: 24,
};

module.exports = {
  commands: ["mute"],
  minArgs: 2,
  expectedArgs: ["<Target's @", "<Reason>"],
  requiredRoles: ["Member"],
  callback: async (message, args) => {
    const Discord = require("discord.js");
    const { guild, author: staff } = message;
    const target = message.mentions.users.first();
    if (!target) {
      message.reply("Please specify someone to mute!");
      return;
    }

    const reason = args[1].toUpperCase();
    if (!reasons[reason]) {
      let validReasons = "";
      for (const key in reasons) {
        validReasons += `${key}, `;
      }
      validReasons = validReasons.substr(0, validReasons.length - 2);
      message.reply(
        `Invalid reason, please use one of the following: ${validReasons}`
      );
      return;
    }

    const prevMutes = await muteSchema.find({
      userID: target.id,
    });

    const currentlyMuted = prevMutes.filter((mute) => {
      return mute.current === true;
    });

    if (currentlyMuted.length) {
      message.reply("User is already muted!");
      return;
    }

    let duration = reasons[reason] * (prevMutes + 1);

    const expires = new Date();
    expires.setHours(expires.getHours() + duration);

    const mutedRole = guild.roles.cache.find((role) => {
      return role.name === "Muted";
    });

    if (!mutedRole) {
      message.reply("Could not find a 'Muted' role");
      return;
    }

    const targetMember = (await guild.members.fetch()).get(target.id);
    targetMember.roles.add(mutedRole);

    await new muteSchema({
      userID: target.id,
      guildID: guild.id,
      reason,
      staffID: staff.id,
      staffTag: staff.tag,
      expires,
      active: true,
    }).save();

    const muteConfirmationEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `✅ <@${target.id}> has been successfully muted for ${reason}, they will be unmuted in ${duration} hours!`
      );

    message.channel.send({
      embed: muteConfirmationEmbed,
    });
  },
};
