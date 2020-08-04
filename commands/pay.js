const money = require('../money.json')
const fs = require('fs')
const discord = require('discord.js');
exports.run = async (bot, message, args, moment) =>
{ 

let user = message.mentions.users.first() || bot.users.get(args[0]);
if(!user) return message.reply('Nincs ilyen felhasználó.')

if(user.id === message.author.id) return message.reply('Nem utalhatsz magadnak pénzt')

if(!args[1]) return message.reply('Kérlek határozd meg az összeget amit át szeretnél utalni.')

if(!money[message.author.id]) return message.reply(' Te nem rendelkezel elég összegel, hogy át utald');

if(parseInt(args[1]) > money[message.author.id].money) return message.reply('Neked nincs ennyi pénzed.')
if(parseInt(args[1]) < 1) return message.reply('Te nem tudsz 1$ alatt utalni!')

if(!money[user.id]) {

    money[user.id] = {
        name: bot.users.get(user.id).tag,
        money: parseInt(args[1])
    }

    money[message.author.id].money -= parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });

} else {

    money[user.id].money += parseInt(args[1]);

    money[message.author.id].money -= parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });

}
    return message.reply(`át utalt  ${args[1]}$ neki: ${bot.users.get(user.id).username}`)

}

module.exports.help = {
    name: "pay",
    aliases: []
}
