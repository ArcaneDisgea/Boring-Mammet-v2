const { MessageAttachment } = require("discord.js");
const { CardCreator } = require("xiv-character-cards");
const fetch = require("node-fetch");

module.exports = {
  name: "whois",
  description: "Displays the information for a FFXIV character.",
  usage: "##whois [server] [first name] [last name]",
  aliases: ["who", "profile"],
  cooldown: 5,
  execute(message, args) {
    const card = new CardCreator();
    let url = `https://xivapi.com/character/search?name=${args[1]}%20${args[2]}&server=${args[0]}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let lodestoneid = data.Results[0].ID;

        function createCard(cb) {
          card
            .ensureInit()
            .then(
              () => card.createCard(lodestoneid),
              (reason) => cb("Init failed: " + reason, null)
            )
            .then((image) =>
              cb(null, {
                binary: {
                  image: image,
                },
              })
            )
            .catch((reason) => cb("createCard failed: " + reason, null));
        }

        createCard((err, response) => {
          if (err) {
            return err;
          }
          const buffer = response.binary.image;
          const attachment = new MessageAttachment(buffer, "bufferedfilename.png");

          return message.channel.send(attachment);
        });
      });
  },
};
