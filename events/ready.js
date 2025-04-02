const { ActivityType, Events, Client } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    /**
     * 
     * @param {Client} client 
     */

    run: async (client, x, config) => {
        try {
            const commands = Array.from(client.commands.values())
            await client.application.commands.set(commands);

            console.log(`[READY] ${client.user.tag} sikeresen bejelentkezett!`);
        } catch (error) {
            console.error(error)
        }
    }
}