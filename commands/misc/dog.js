
//npm i request
const Discord = require("discord.js");
module.exports = {
    commands: "dog",
    minArgs: 0,
    maxArgs: 0,
    callback: async  (message, arguments, text) => {
        
        const request = require('request');

        request.get('https://loremflickr.com/320/240/dog', {
        
        },
         function(error, response, body) {
            if(!error && response.statusCode == 200) {
                const dEmbed = new Discord.MessageEmbed()
                    .setColor('#87b2e8')
                    .setAuthor('DOGS!',message.guild.iconURL)
                    .setTimestamp()
                    .setFooter('SABER')
                    .setImage(response.request.uri.href);
                    message.channel.send(dEmbed)
                
            } else {
                console.log(error);
            }
        })
                      
        
    },
};






