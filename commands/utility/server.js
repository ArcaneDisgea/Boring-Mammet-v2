const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "server",
  description: "Displays server information.",
  usage: "##server",
  aliases: ["guild", "discord"],
  cooldown: 2,
  guildOnly: true,
  execute(message, args) {
    const embed = new MessageEmbed().setTitle(``).setAuthor(message.guild.name);
    let MFA;
    if (message.guild.description) {
      embed.setDescription(message.guild.description);
    }
    embed
      .setColor(0xff0000)
      .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 2048 }))
      .addField(`Owner:`, message.guild.owner);
    if (message.guild.vanityURLCode) {
      embed.addField(`Vanity URL`, message.guild.vanityURLCode);
    }
    embed
      .addField(`Created on:`, message.guild.createdAt)
      .addField(`Region:`, message.guild.region, true)
      .addField(`Locale`, message.guild.preferredLocale, true)
      .addField(`Members:`, message.guild.memberCount, true);
    if (message.guild.mfaLevel === 0) {
      MFA = "Not Required";
    } else {
      MFA = "Required";
    }
    embed
      .addField(`MFA Level:`, MFA, true)
      .addField(`Verification Level`, message.guild.verificationLevel, true)
      .addField(`Explicit Content Filter`, message.guild.explicitContentFilter, true)
      .addField(`Partner Status`, message.guild.partnered, true)
      .addField(`Verified Status`, message.guild.verified, true)
      .addField(`Boost Level`, message.guild.premiumTier, true)
      .addField(`Boosts`, message.guild.premiumSubscriptionCount, true);
    message.channel.send(embed);
  },
};
