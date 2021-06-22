module.exports = {
  name: "poll",
  description: "Create a reaction based poll with up to 10 unique responses. Seperate questions and responses with a ``;``",
  usage: "##poll",
  cooldown: 5,
  execute(message, args) {
    const array = args.toString().split(";");
    const question = array.shift().replace(/,/g, " ");
    const numberEmoji = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    let responses = [];

    if (array.length >= 11) {
        return message.channel.send(":anger: Too many responses!")
    }
    
    for (pollResp of array) {
      responses.push(pollResp.replace(/,/g, " "));
    }

    let pollQuestion = `${question}\n\n`;
    for (let i = 0; i < responses.length; i++) {
      pollQuestion += `${numberEmoji[i]}: ` + `${responses[i]}\n`;
    }

    return message.channel.send(pollQuestion).then((poll) => {
      for (let i = 0; i < responses.length; i++) {
        poll.react(numberEmoji[i]);
      }
    });
  },
};
