const Discord = require('discord.js');
const fs = require('fs')
const money = require('../money.json')
exports.run = async (bot, message, args) =>
{ 

    if(message.author.id != '415542069940060160') return message.reply('Te nem használhatod ezt a parancsot')

    let user = message.mentions.members.first() || bot.users.get(args[0]);
    if(!user) return message.reply("Nem található felhasználó!");

    if(!args[1]) return message.reply('Kérlek adj meg egy összeget!')

    if(user.id === message.author.id) return message.reply('Nem utalhatsz magadnak pénzt')

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.get(user.id).tag,
            money: parseInt(args[1])
        }


        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }   else {
        money[user.id].money += parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }

    return message.channel.send(`${message.author.username} admin utalás $${args[1]} neki: ${bot.users.get(user.id).username}`)

}

module.exports.help = {
    name: "ping",
    aliases: ["p"]
}