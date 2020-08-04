const discord = require('discord.js');
const commando = require('discord.js-commando')
const moment = require('moment')
const botconfig = require('./botconfig.json')
const fs = require('fs')
var bot = new commando.Client ({
    disabledEvryone: true,
    unknownCommandResponse: false
});
let prefix = '?'
bot.on('message', async (message) => 
{
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(bot, message, args, prefix, moment);
    } catch (err) {
}});


// ---------------------------###Eleje###------------------------------- \\
bot.on("ready", async () => {
    const valtozok = [
        "",
        `?help`,
        `Bot owner: MateHUN😂#9710`
    ]
    setInterval(function() {
        const index = Math.floor(Math.random() * (valtozok.length - 1) + 1);
         bot.user.setActivity(valtozok[index], {type: "PLAYING"});
    }, 3000);
})

bot.on("ready", async () => {
    console.log(`[${bot.user.username}] El indultam ennyi szerveren : [${bot.guilds.size}] \n Ekkor: ${moment().format('LLLL')} \n \n \n \n \n \n \n `)  
})

// -------------------------###VEGE###------------------------------------- \\

// LOGIN
bot.login(process.env.token)

