module.exports = {
  name: "prune",
  description: "Prune up to 99 messages.",
  usage: "##prune [number]",
  aliases: ['purge', 'clean'],
  cooldown: 2,
  guildOnly: true,
  execute(message, args) {
    if (message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
      const amount = parseInt(args[0]) + 1;

      if (isNaN(amount)) {
        return message.reply(":anger: That doesn't seem to be a valid value.");
      } else if (amount <= 1 || amount > 100) {
        return message.reply(":anger: You need to input a number between 1 and 99.");
      }

      message.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        message.channel.send(":bug: There was an error trying to prune messages in this channel!");
      });
      message.channel.send("Pruned" + ` ${amount} ` + "messages.");
      message.channel.bulkDelete(1);
    } else {
      message.reply(":anger: You do not have permission to use this command.");
    }
  },
};
