require('dotenv').config();

module.exports = {
    bot: {
        token: process.env.TOKEN,
        guild: process.env.GUILD,
        id: process.env.BOT_ID
    }
};