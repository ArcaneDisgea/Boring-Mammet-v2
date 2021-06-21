const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Displays a users avatar.",
  aliases: ["icon", "pfp"],
  usage: "##avatar [@user]",
  cooldown: 5,
  execute(message, args) {
    message.channel.startTyping();
    if (!message.mentions.users.size) {
      const AuthorEmbed = new MessageEmbed().setTitle(`${message.author.username}'s avatar`).setImage(message.author.displayAvatarURL({ dynamic: true, size: 4096 }));
      message.channel.stopTyping();
      return message.channel.send(AuthorEmbed);
    } else {
      message.mentions.users.map((user) => {
        const MentionEmbed = new MessageEmbed().setTitle(`${user.username}'s avatar`).setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));
        message.channel.stopTyping();
        return message.channel.send(MentionEmbed);
      });
    }
  },
};
