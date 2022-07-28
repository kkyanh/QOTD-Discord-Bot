require("dotenv").config();
const qotd = require("random-question");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const cron = require("cron");

//Logs that the bot is online and to start scheduled QOTD message function
module.exports = (Discord, client) => {
    //Log and set activity
    console.log("QOTD Bot is running");
    client.user.setActivity("question simulator at the Tavern");

    //Creates schedule QOTD to run at 12:00:01 AM
    let scheduledQOTD = new cron.CronJob("01 00 00 * * *", () => {
        const guild = client.guilds.cache.get(process.env.SERVER_ID);
        const channel = guild.channels.cache.get(process.env.QOTD_ID);

        const todaysQuestion = qotd.randomQuestion();
        
        //Gets random picture of a cat from the cat API
        fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => response.json())
        .then((data) => {
            let catPic = data[0].url;
            
            //Creates an embed with the question and cat picture to send to channel
            const catEmbed = new Discord.MessageEmbed()
            .setColor("#FBEFDF")
            .setTitle("Question of the Day")
            .setDescription(todaysQuestion)
            .setImage(catPic);
                
            channel.send(catEmbed);
        });
    });
    scheduledQOTD.start();
}