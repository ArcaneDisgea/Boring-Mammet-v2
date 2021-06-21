module.exports = {
  name: "kick",
  description: "Kick a user.",
  usage: "##kick [@user]",
  aliases: ['N/A'],
  cooldown: 5,
  guildOnly: true,
  execute(message) {
    if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
      if (!message.guild) return;
      const user = message.mentions.users.first();

      if (user) {
        const member = message.guild.member(user);

        if (member) {
          member
            .kick({
              reason: "They were bad!",
            })
            .then(() => {
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch((err) => {
              message.reply("I was unable to ban the member");

              console.error(err);
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("You didn't mention the user to ban!");
      }
    } else {
      message.reply("You do not have permission to use this command.");
    }
  },
};
