module.exports = {
    commands: "coin",
    minArgs: 0,
    maxArgs: 0,
    callback:(message)=> {
        let number = Math.floor(Math.random() * 2);
        if (number == 1) {
            message.channel.send('You got Heads')
        }
        if (number == 0) {
            message.channel.send('You got Tails')
        }
    }
};