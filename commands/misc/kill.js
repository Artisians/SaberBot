const Discord = require("discord.js");
module.exports = {
  commands: "kill",
  minArgs: 1,
  expectedArgs: "<Users @>",
  callback: (message) => {
    let user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("Please include who you are killing.");
    }

    const kEmbed = new Discord.MessageEmbed()
    .attachFiles("https://i.gifer.com/JZm.gif");
    
    message.channel.send(
    message.author.username + " Killed " + user.username
    )
    message.channel.send(kEmbed)
      
    
  },
};
