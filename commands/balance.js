const fs = require('fs')
const money = require('../money.json')
const Discord = require('discord.js');
exports.run = async (bot, message, args, moment) =>
{ 

if(!args[0]) {
    var user = message.author;
} else {
    var user =message.mentions.users.first() || bot.users.get(args[0]);
}

if(!money[user.id]) {
    money[user.id] = {
        name:bot.users.get(user.id).tag,
        money: 0
    }
    fs.writeFile('./money.json', JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });
}

return message.channel.send(`${bot.users.get(user.id).username} nak/nek $${money[user.id].money} ja.`);

}

module.exports.help = {
    name:'balance',
    aliases: ["bal", "money"]
}
