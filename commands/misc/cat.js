//npm i request
const Discord = require("discord.js");
module.exports = {
    commands: "cat",
    minArgs: 0,
    maxArgs: 0,
    callback: async  (message, arguments, text) => {
        
        const request = require('request');

        request.get('http://thecatapi.com/api/images/get?format=src&type=png', {
        
        },
         function(error, response, body) {
            if(!error && response.statusCode == 200) {
                const cEmbed = new Discord.MessageEmbed()
                    .setColor('#00FFFF')
                    .setAuthor('CATS!',message.guild.iconURL)
                    .setTimestamp()
                    .setFooter('SABER')
                    .setImage(response.request.uri.href);
                    message.channel.send(cEmbed)
                
            } else {
                console.log(error);
            }
        })
                      
        
    },
};