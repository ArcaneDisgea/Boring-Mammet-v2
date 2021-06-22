const { MessageEmbed } = require("discord.js");
const { default: fetch } = require("node-fetch");
const Pokedex = require("pokedex-promise-v2");

const options = {
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

function firstUpper(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}

module.exports = {
  name: "pokemon",
  description: "Search for a pokemon!",
  usage: "##pokemon [pokemon name]",
  aliases: ["p", "poke", "mon"],
  cooldown: 5,
  execute(message, args) {
    if (args.length > 1) {
      return message.channel.send(":anger: Too many arguments.");
    }

    const embed = new MessageEmbed();
    P.getPokemonByName(args[0].toLowerCase())
      .then(function (response) {
        const pokeName = firstUpper(response.name);
        embed.setTitle(pokeName).setThumbnail(response.sprites.front_default);

        message.channel.startTyping();

        fetch(response.species.url)
          .then((response) => response.json())
          .then((data) => {
            for (flavor of data.flavor_text_entries) {
              if (flavor.language.name === "en") {
                embed.setDescription(flavor.flavor_text.replace(/\r?\n|\r|\f/g, " "));
                break;
              }
            }

            embed.addField("Generation", firstUpper(data.generation.name), true);

            fetch(data.evolution_chain.url)
              .then((response) => response.json())
              .then((evolveData) => {
                const height = response.height * 0.1;
                const weight = response.weight * 0.1;
                if (evolveData.chain.evolves_to[0] === undefined) {
                  embed
                    .addField("Evolutions", "No Evolutions", true)
                    .addField("\u200b", "\u200b", true)
                    .addField("Height", height.toFixed(2) + "m", true)
                    .addField("Weight", weight.toFixed(2) + "kg", true);
                  if (data.habitat === null) {
                    embed.addField("Habitat", "Unknown", true);
                  } else {
                    embed.addField("Habitat", firstUpper(data.habitat.name), true);
                  }
                  embed
                    .addField("Egg Groups", firstUpper(data.egg_groups[0].name.replace(/-/g, " ")), true)
                    .addField("Growth Rate", firstUpper(data.growth_rate.name), true)
                    .addField("Base Happiness", data.base_happiness, true)
                    .addField("Capture Rate", data.capture_rate + "/255", true)
                    .setFooter("Powered by Pokeapi", "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png");
                  message.channel.stopTyping();
                  return message.channel.send(embed);
                }
                embed
                  .addField(
                    "Evolutions",
                    firstUpper(
                      `${firstUpper(evolveData.chain.species.name)} -> ${firstUpper(evolveData.chain.evolves_to[0].species.name)} -> ${firstUpper(
                        evolveData.chain.evolves_to[0].evolves_to[0].species.name
                      )}`
                    ),
                    true
                  )
                  .addField("\u200b", "\u200b", true)
                  .addField("Height", height.toFixed(2) + "m", true)
                  .addField("Weight", weight.toFixed(2) + "kg", true);
                if (data.habitat === null) {
                  embed.addField("Habitat", "Unknown", true);
                } else {
                  embed.addField("Habitat", firstUpper(data.habitat.name), true);
                }
                embed
                  .addField("Egg Groups", firstUpper(data.egg_groups[0].name.replace(/-/g, " ")), true)
                  .addField("Growth Rate", firstUpper(data.growth_rate.name), true)
                  .addField("Base Happiness", data.base_happiness, true)
                  .addField("Capture Rate", data.capture_rate + "/255", true)
                  .setFooter("Powered by Pokeapi", "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png");
                message.channel.stopTyping();
                return message.channel.send(embed);
              });
          });
      })
      .catch(function (error) {
        message.channel.stopTyping();
        return message.channel.send(":bug: Please check your spelling and try again.");
      });
  },
};
