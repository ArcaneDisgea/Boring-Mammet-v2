const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");

TimeAgo.addDefaultLocale(en);

module.exports = {
  name: "freecompany",
  description: "Freecompany profile.",
  usage: "##freecompany [server] [name]",
  aliases: ["fc"],
  cooldown: 5,
  execute(message, args) {
    let server = args.shift();
    let fc = args.toString().replace(/,/g, " ");
    let url = `https://xivapi.com/freecompany/search?name=${fc}&server=${server}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Results[0] === undefined) {
          return message.channel.send(":anger: Invalid character or server!");
        }

        fetch(`https://xivapi.com/freecompany/${data.Results[0].ID}`)
          .then((response) => response.json())
          .then((data) => {
            const timeAgo = new TimeAgo("en-US");

            let utcSeconds = data.FreeCompany.Formed;
            let d = new Date(utcSeconds * 1000);
            let formed = timeAgo.format(d);

            const embed = new MessageEmbed();
            embed.setAuthor(`${data.FreeCompany.Name} «${data.FreeCompany.Tag}»`)
            .setURL(`https://na.finalfantasyxiv.com/lodestone/freecompany/${data.FreeCompany.ID}}`);
            if (data.FreeCompany.Slogan != "") {
              embed.setDescription(data.FreeCompany.Slogan);
            }
            embed
              .setThumbnail(`https://xivapi.com/freecompany/${data.FreeCompany.ID}/icon`)
              .addField("Formed", formed, true)
              .addField("Server, Datacenter", `${data.FreeCompany.Server}, ${data.FreeCompany.DC}`, true)
              .addField("Active", data.FreeCompany.Active, true)
              .addField("Active Members", data.FreeCompany.ActiveMemberCount, true)
              .addField("Rank", data.FreeCompany.Rank, true);
            if (data.FreeCompany.Recruitment != "") {
              embed.addField("Recruitment", data.FreeCompany.Recruitment, true);
            }
            if (data.FreeCompany.Estate.Plot != null) {
              embed.addField("Estate", data.FreeCompany.Estate.Name, true).addField("Plot", data.FreeCompany.Estate.Plot, true).addField("Greeting", data.FreeCompany.Estate.Greeting);
            }

            return message.channel.send(embed);
          });
      });
  },
};
