const xpSchema = require("../../../schemas/xp-schema.js");

module.exports = (client) => {
  client.on("message", (message) => {
    const { guild, member } = message;
    addXP(guild.id, member.id, 23, message);
  });
};

const getNeededXP = (level) => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
  const result = await xpSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        xp: xpToAdd,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
  let { xp, level } = result;
  const needed = getNeededXP(level);

  if (xp >= needed) {
    ++level;
    xp -= needed;
    message.reply(
      `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
        level
      )} XP to level up again.`
    );
    await xpSchema.updateOne(
      {
        guildId,
        userId,
      },
      { level, xp }
    );
  }
};
