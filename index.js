const { Client, GatewayIntentBits, Collection } = require('discord.js');
// const { QuickDB } = require('quick.db');
const schedule = require('node-schedule');

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((intent) => {
        return GatewayIntentBits[intent]
    }),
    partials: ['MESSAGE', 'CHANNEL']
});

client.commands = new Collection();
// client.db = new QuickDB();
const config = require('./utils/config');

const { readdirSync } = require('fs');

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`[COMMAND] ${command.name} parancs betöltve!`)
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.run(client, ...args, config))
    } else {
        client.on(event.name, (...args) => event.run(client, ...args, config))
    }

    console.log(`[EVENT] ${event.name} event betöltve!`)
}

client.rest.on('rateLimited', (...data) => {
    client.destroy();
    console.log('[RATELIMIT]', ...data)
});

process.on('uncaughtException', (error) => {
    console.log(`[${new Date()}] ${error}`);
});

process.on('unhandledRejection', error => {
    console.log(`[${new Date()}] ${error}`);
});

client.login(config.bot.token);