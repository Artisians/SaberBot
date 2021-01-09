const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
  commands: ['register', 'reg'],
  callback: async (message) => {
    const guildId = message.guild.id
    const target =  message.author
    const targetId = target.id
    let value = economy.registerNewUser(guildId,targetId)
    if(value !== null){
        message.reply(`here are some commands, \n Welcome to the Economy system get started with these commands`)
        const embed = new Discord.MessageEmbed()
        .setTitle('Economy System Commands')
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
        message.reply(`has been registered before`) 
    }
  },
}