const fs = require("fs");

//Handler to load events for server
module.exports = (client, Discord) => {
    const loadDir = (dirs) => {
        const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../events/${dirs}/${file}`);
            const eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, Discord, client));
        }
    }

    ["client", "guild"].forEach(e => loadDir(e));
}