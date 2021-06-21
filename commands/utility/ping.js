module.exports = {
  name: "ping",
  description: "Pong! Check my heartbeat.",
  usage: "##ping",
  cooldown: 5,
  execute(message, args) {
    message.channel.send("Pong.");
  },
};
