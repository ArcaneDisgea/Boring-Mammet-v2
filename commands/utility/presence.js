const { client } = require('discord.js')
module.exports = {
  name: "presence",
  description: "Change bot's discord presence.",
  usage: "##presence [type] [words]",
  cooldown: 5,
  execute(message, args) {
    const statusType = args.shift()
    const description = args.toString().replace(/,/g, " ")
    console.log(statusType)
    console.log(description)
    client.user.setPresence({ name: description, status: statusType})
  },
};