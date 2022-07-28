const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["commandHandler", "eventHandler"].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

require("dotenv").config();


client.login(process.env.TOKEN);