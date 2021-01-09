const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
  commands: ['register', 'reg'],
  callback: async (message) => {
    const guildId = message.guild.id
    const target =  message.author
    const targetId = target.id
    let returnning = economy.registerNewUser(guildId,targetId)
    if(!returnning){
        message.reply(`has been registered, \n Welcome to the Economy system get started with there commands`)
        const embed = new Discord.MessageEmbed()
        .setTitle('Example text embed')
        .setColor('#00AAFF')
        .addFields(
          {
            name: '?balance',
            value: 'check your balance and the coins you earn',
          },
          {
            name: '?work',
            value: 'Find a job and earn money and experiance',
          },
          {
            name: '?add-balance @user #amount',
            value: 'if you are an admin, give your friends some money to get them started',
          }
        )
      message.channel.send(embed)      
    }else{
        message.reply(`<@${targetId}> has been registered before`)
    }
  },
}