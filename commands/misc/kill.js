module.exports = {
  commands: "kill",
  minArgs: 1,
  expectedArgs: "<Users @>",
  callback: (message) => {
    let user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("Please include who you are killing.");
    }
    return message.channel.send(
      message.author.username + " Killed " + user.username
    );
  },
};
