const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
const inventorySchema = require('./schemas/inventory-schema')
const { Message } = require('discord.js')

const coinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addXP = async (guildId, userId, xp)  => {
  return await mongo().then(async (mongoose) => {
    console.log('Running findOneAndUpdate()')

    const result = await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          xp,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )
    console.log('RESULT:', result)

    return result.xp
  
  })
}

module.exports.addLevel = async (guildId, userId, xp)  => {
  return await mongo().then(async (mongoose) => {
    let level = Math.floor(xp/10000);
    console.log('Running findOneAndUpdate()')
    const result = await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          level,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )
    console.log('RESULT:', result)
    
    return result.level
  })
}

module.exports.registerNewUser= async (guildId, userId) => {

  return await mongo().then(async (mongoose) => {
    
    console.log('Running findOne()')

    const result = await profileSchema.findOne({
      guildId,
      userId,
    })

    console.log('RESULT:', result)

    let coins = 0
    let level = 1
    let xp = 0
    let worked = 0

    if (result) {
      return true
    } else {
      console.log('Inserting a document')
      await new profileSchema({
        guildId,
        userId,
        coins,
        level,
        xp,
        worked,
      }).save()
    }
    return false
    
  })
}

module.exports.getWorked = async (guildId, userId) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')
      const result = await profileSchema.findOne({
        guildId,
        userId,
      })

      console.log('RESULT:', result)
      worked = result.worked
      return worked
    } finally {
      mongoose.connection.close()
    }
  })
}


module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    console.log('Running findOneAndUpdate()')

    const result = await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          coins,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    console.log('RESULT:', result)

    coinsCache[`${guildId}-${userId}`] = result.coins

    return result.coins
  
  })
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    
    console.log('Running findOne()')

    const result = await profileSchema.findOne({
      guildId,
      userId,
    })

    console.log('RESULT:', result)

    let coins = 0
    if (result) {
      coins = result.coins
    } else {
      console.log('Inserting a document')
      await new profileSchema({
        guildId,
        userId,
        coins,
      }).save()
    }

    coinsCache[`${guildId}-${userId}`] = coins

    return coins
  
  })
}