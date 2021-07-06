require('dotenv').config()
// const { port, token, prefix} = require("./config");
const fs = require("fs");

const express = require("express");
const app = express();

const port = process.env.PORT
const token = process.env.TOKEN
const prefix = process.env.PREFIX

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    file_type = file.split(".").pop();
    file_name = file.split(/(\\|\/)/g).pop();
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file_type == "js") results.push(file);
    }
  });
  return results;
};

const commandFiles = walk("./commands");

for (const file of commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    activity: {
      name: "a game.",
      type: "COMPETING"
    }
  })
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`:timer: Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    message.channel.startTyping();
    command.execute(message, args);
    message.channel.stopTyping();
  } catch (error) {
    console.error(error);
    message.channel.stopTyping();
    message.reply(":bug: There was an error trying to execute that command!");
  }
});

client.login(token);

// start site
app.listen(port, () => {
  console.log(`Site started at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/site/index.html');
});

app.get("/nickname", (req, res) => {
  let nick = req.query.name;
  let user = req.query.user;
  let guildID = req.query.guild;

  const guild = client.guilds.cache.get(guildID);

  guild.members.fetch(user).then((member) => {
    member.setNickname(nick);
  });
});
