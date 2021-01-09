 
const economy = require('../../economy')

module.exports = {
  commands: ['register', 'reg'],
  minArgs: 1,
  callback: async (message,) => {
    const guildId = message.guild.id
    const target =  message.author
    const targetId = target.id




    if (!mention) {
      message.reply('Please tag a user to add coins to.')
      return
    }

    const coins = arguments[1]
    if (isNaN(coins)) {
      message.reply('Please provide a valid numnber of coins.')
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `You have given <@${userId}> ${coins} coin(s). They now have ${newCoins} coin(s)!`
    )
  },
}