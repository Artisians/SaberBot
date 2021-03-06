const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
  commands: ['work','guildwork'],
  maxArgs: 1,
  callback: async (message) => {
    const guildId = message.guild.id
    const target = message.author
    const userId = target.id

    let jobs = ["Wood Cutter", "Guild Hall Reseptionist", "Fisherman" , "Adventurer", "Librarian"]
    let timeoutworked = 43200000
    let worked = await economy.getWorked(guildId, userId) 
    

    if(worked != null && timeoutworked-(Date.now() - worked) > 0){
        message.reply(
            `You have already worked today. time to rest. try again later`
        )
    }else {
        let job = jobs[Math.floor(Math.random()* jobs.length)]
        let amountearned = Math.floor(Math.random()*1000) + 400 
        let xpearned = Math.floor(Math.random()*4000) + 700

        
        const newCoins = await economy.addCoins(guildId, userId, amountearned)
        const newXP = await economy.addXP(guildId, userId, xpearned) 
        const newLevel = await economy.addLevel(guildId, userId, newXP) 
        const workeddone = await economy.updateWorked(guildId, userId, Date.now()) 
        const worksuccess = new Discord.MessageEmbed()
            .setTitle(`${target.tag}, Great job today ${workeddone}`)
            .setColor('#FFFFFF')
            .setDescription(`you worked today as a ${job}\n and earned ${amountearned} coins and ${xpearned} XP
             now standing at ${newXP}XP .\n  : you are level: ${newLevel} and you have a balance of ${newCoins} coins`)

        message.channel.send(worksuccess)
    }
  },
}