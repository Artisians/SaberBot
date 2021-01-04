module.exports = {
  commands: ["purge"],
  minArgs: 1,
  expectedArgs: "<# Of Messages!>",
  requiredRoles: ["Member"],
  callback: async (message, args) => {
    const Discord = require("discord.js");
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Number is valid!");

    if (!Number.isInteger(amountToDelete))
      return message.channel.send("Number is not a whole number!");

    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100)
      return message.channel.send("Number must be between 2 and 100!");

    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete,
    });

    try {
      await message.channel.bulkDelete(fetched);
      const purgeConfirmationEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ ${amountToDelete} messages have been removed`);
      let purgeConfirmationMessage = await message.channel.send(
        purgeConfirmationEmbed
      );
      purgeConfirmationMessage.delete();
    } catch (err) {
      console.log(err);
      message.channel.send(
        "Unable to delete messages, make sure they are within 14 days!"
      );
    }
  },
};
