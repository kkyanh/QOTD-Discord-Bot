const randomQ = require("random-question")

//Command to get bot to ask a random question
module.exports = {
    name: "question",
    aliases: ["q"],
    description: "gives random question",
    execute(client, message, args) {
        const question = randomQ.randomQuestion();
        message.channel.send(question);
    }
}