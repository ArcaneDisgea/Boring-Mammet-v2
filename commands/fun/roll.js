module.exports = {
  name: "roll",
  description: "Roll some up to a 20 sided die, 10 times or fewer.",
  usage: "##roll [number of sides] [number of times]",
  cooldown: 2,
  execute(message, args) {
    message.channel.startTyping();
    function rollDice(max) {
      return 1 + Math.floor(Math.random() * max);
    }

    let counter = 1;
    let results = [];
    let rolls = parseInt(args[1]);
    let die = parseInt(args[0]);

    function quantityRoll() {
      if (counter <= rolls) {
        counter++;
        const dice = rollDice(die);
        results.push(dice);
        setTimeout(quantityRoll, 1000);
        if (counter > rolls) {
          message.channel.stopTyping();
          return message.channel.send(results.toString().replace(/,/g, ", "));
        }
      }
    }

    if (rolls <= 10 && die <= 20) {
      return quantityRoll();
    }
    message.channel.stopTyping();
    return message.channel.send(":anger: You are using too many dice or asking for too many rolls. Please try again with less dice or fewer rolls.");
  },
};
