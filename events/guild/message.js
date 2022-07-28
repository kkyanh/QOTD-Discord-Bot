require("dotenv").config();

//How bot responds to messages from users
module.exports = (Discord, client, message) => {
    //Prefix to properly message bot
    const prefix = process.env.PREFIX;

    //Stops bot from responding to messages without the prefix or itself
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Cuts the user's message in order to ignore the prefix and check commands properly
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandMessage = args.shift().toLowerCase();
    const command = client.commands.get(commandMessage) || client.commands.find(a => a.aliases && a.aliases.includes(commandMessage));

    //Checks the command the user is sending and acts accordingly
    if (command)
        command.execute(client, message, args, Discord);
    else
        message.channel.reply("Huh?");
}