module.exports = {
  commands: "rps",
  minArgs: 1,
  expectedArgs: "<Rock/Paper/Scissors>",
  callback: (message, args) => {
    if (!args[0]) {
      return message.channel.send("Please include your choice.");
    }
    let choices = ["rock", "paper", "scissors"];
    if (choices.includes(args[0].toLocaleLowerCase())) {
      let number = Math.floor(Math.random() * 3);
      if (number == 1) {
        return message.channel.send(
          "It was a tie, we both had " + args[1].toLocaleLowerCase()
        );
      }
      if (number == 2) {
        if (args[0].toLocaleLowerCase() == "rock") {
          return message.channel.send("I won, I had paper.");
        }
        if (args[0].toLocaleLowerCase() == "paper") {
          return message.channel.send("I won, I had scissors.");
        }
        if (args[0].toLocaleLowerCase() == "scissors") {
          return message.channel.send("I won, I had rock.");
        }
      }
      if (number == 0) {
        if (args[0].toLocaleLowerCase() == "rock") {
          return message.channel.send("You won, I had scissors.");
        }
        if (args[0].toLocaleLowerCase() == "paper") {
          return message.channel.send("You won, I had rock.");
        }
        if (args[0].toLocaleLowerCase() == "scissors") {
          return message.channel.send("You won, I had paper.");
        }
      }
    } else {
      return message.channel.send(
        "Please include either : Rock, Paper, or Scissors."
      );
    }
  },
};
