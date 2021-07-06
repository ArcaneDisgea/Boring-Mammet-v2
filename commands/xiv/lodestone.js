const fetch = require("node-fetch");

module.exports = {
  name: "lodestone",
  description: "Posts a characters lodestones profile.",
  usage: "##lodestone [server] [first name] [last name]",
  aliases: ["ls"],
  cooldown: 5,
  execute(message, args) {
    let url = `https://xivapi.com/character/search?name=${args[1]}%20${args[2]}&server=${args[0]}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Results[0] === undefined) {
          return message.channel.send(":anger: Invalid character or server!");
        }

        let lodestoneid = data.Results[0].ID;
        return message.channel.send(`https://na.finalfantasyxiv.com/lodestone/character/${lodestoneid}`);
      });
  },
};
