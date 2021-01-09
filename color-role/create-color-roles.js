
module.exports = {
    commands: ["coloradd"],
    permissionError: "You need <> permission to run this command",
    minArgs: 0,
    requiredRoles: ["Member"],
    callback: (message, arguments, text) => {
      //Functionality Code!
     const Discord= require('discord.js');
     let color = message.member.displayHexColor;
    
     if (color == '#000000') color = message.member.roles.hexColor;
     const addcolorrole=new Discord.MessageEmbed()
     .setAuthor(message.author.username, message.author.displayAvatarURL)
     .setColor(color)
     
     message.channel.send({
      embed: addcolorrole,
    });
    }   
  };