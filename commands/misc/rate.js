module.exports = {
  commands: "rate",
  minArgs: 1,
  expectedArgs: "<Users @ or ID>",
  callback: (message, args) => {
    let number = Math.floor(Math.random() * 101);
    if (!args[0]) {
      return message.channel.send("I would rate you a " + number + "/100");
    } else {
      let user = message.mentions.users.first();
      if (!user) {
        return message.channel.send("Please include who you are rating.");
      }
      return message.channel.send(
        "I would rate " + user.username + " a " + number + "/100"
      );
    }
  },
};
