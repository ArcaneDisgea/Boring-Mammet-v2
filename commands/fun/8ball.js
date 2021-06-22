module.exports = {
  name: "8ball",
  description: "Ask a question to the all knowing 8ball.",
  usage: "##8ball",
  cooldown: 5,
  execute(message, args) {
    if (!args.length) {
      return message.channel.send(":anger: Please ask me a question.");
    }

    const responses = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes, definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];

    const response = Math.floor(Math.random() * responses.length);
    message.channel.send(responses[response]);
  },
};
