//Command that sends GitHub link for bot
module.exports = {
    name: "github",
    aliases: ["source", "src", "g"],
    description: "sends link to github of bot",
    execute(client, message, args) {
        message.channel.send("https://github.com/kkyanh/QOTD-Discord-Bot");
    }
}