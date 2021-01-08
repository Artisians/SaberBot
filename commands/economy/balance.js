const economy = require('../../economy')

module.exports = {
    //to get the balance of a character by writing balance or bal
    commands : ['balance', 'bal'],
    maxArgs: 1, 
    // to get the balance with bal or bal @user (for a certain user)
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        // target identifying after the command chacking if it's for another useer or the autho
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id
        const coins = await economy.getCoins(guildId,userId)
        message.reply(`That user has  ${coins} coins`)
    },
    
}