const { roll } = require("@airjp73/dice-notation");
module.exports = {
  name: "roll",
  description: "Roll some up to a 20 sided die, 10 times or fewer.",
  usage: "##roll 2d6 + 3",
  cooldown: 2,
  execute(message, args) {
    const dice = args.toString().replace(/,/g, " ");
    const result = roll(dice);
    return message.channel.send(result.result)
  },
};
