const fetch = require("node-fetch");
module.exports = {
  name: "cats",
  description: "Posts a random cat picture.",
  usage: "##cats",
  aliases: ["cat", "kitten"],
  cooldown: 5,
  execute(message, args) {
    fetch("https://api.thecatapi.com/v1/images/search?size=full")
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data[0].url);
      });
  },
};
