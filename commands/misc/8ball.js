module.exports = {
  commands: "8ball",
  minArgs: 1,
  expectedArgs: "<Question>",
  callback: (message, args) => {
    if (!args[0]) {
      return message.channel.send("Please ask a full question.");
    }
    let number = Math.floor(Math.random() * 6);
    if (number == 0) {
      return message.channel.send("Yes, definitely so.");
    }
    if (number == 1) {
      return message.channel.send("No, definitely not.");
    }
    if (number == 2) {
      return message.channel.send("Ask again later.");
    }
    if (number == 3) {
      return message.channel.send("It is uncertain.");
    }
    if (number == 4) {
      return message.channel.send("Odds are not in your favor.");
    }
    if (number == 5) {
      return message.channel.send("Odds are in your favor.");
    }
  },
};
