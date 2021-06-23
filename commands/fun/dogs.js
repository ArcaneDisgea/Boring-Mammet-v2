const fetch = require("node-fetch");
module.exports = {
  name: "dogs",
  description: "Posts a random dog picture.",
  usage: "##dogs",
  aliases: ["dog", "puppy", "pupper", "doggo"],
  cooldown: 5,
  execute(message, args) {
    fetch("https://api.thedogapi.com/v1/images/search?size=full")
      .then((response) => response.json())
      .then((data) => {
        message.channel.send(data[0].url);
      });
  },
};
