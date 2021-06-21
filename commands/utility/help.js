const prefix = require("../../config.js").prefix;
const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "##help [command name]",
  cooldown: 5,
  execute(message, args) {
    const { commands } = message.client;
    const embed = new MessageEmbed();
    if (!args.length) {
      embed.setTitle("Help Menu").setDescription("Here's a list of all my commands.").setAuthor("Boring Mammet");
      commands.forEach((value, key) => {
        embed.addField(prefix + value.name, value.description);
      });
      return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (command === undefined) {
      return message.channel.send(":anger: That is not a valid command name.");
    }
    embed
      .setTitle(command.name)
      .setDescription(command.description)
      .setAuthor("Boring Mammet")
      .addField("Usage", command.usage)
      .addField("Cooldown", `${command.cooldown} seconds`);
    if (command.aliases != undefined) {
      embed.addField("Aliases", command.aliases);
    }

    return message.channel.send(embed);
  },
};
