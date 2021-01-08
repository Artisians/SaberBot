const Discord = require("discord.js");
module.exports = (client) => {
  console.log("WAITING FOR REACTIONS!");
  client.on("messageReactionAdd", async (reaction) => {
    const handleStarboard = async () => {
      const starboard = client.channels.cache.find(
        (channel) => channel.name.toLowerCase() === "starboard"
      );
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find((msg) =>
        msg.embeds.length === 1
          ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
            ? true
            : false
          : false
      );
      if (existingMsg) existingMsg.edit(`${reaction.count} - 🌟`);
      else {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            reaction.message.author.tag,
            reaction.message.author.displayAvatarURL()
          )
          .addField("Url", reaction.message.url)
          .setDescription(reaction.message.content)
          .setFooter(
            reaction.message.id +
              " - " +
              new Date(reaction.message.createdTimestamp)
          );
        if (starboard) starboard.send("1 - ⭐", embed);
      }
    };
    if (reaction.emoji.name === "🌟") {
      if (reaction.message.channel.name.toLowerCase() === "starboard") return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
  });
  client.on("messageReactionRemove", async (reaction) => {
    const handleStarboard = async () => {
      const starboard = client.channels.cache.find(
        (channel) => channel.name.toLowerCase() === "starboard"
      );
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find((msg) =>
        msg.embeds.length === 1
          ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
            ? true
            : false
          : false
      );
      if (existingMsg) {
        if (reaction.count === 0) existingMsg.delete({ timeout: 2500 });
        else existingMsg.edit(`${reaction.count} - 🌟`);
      }
    };
    if (reaction.emoji.name === "🌟") {
      if (reaction.message.channel.name.toLowerCase() === "starboard") return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
  });
};
