const Discord = require('discord.js');
const money = require('../money.json')
const fs = require('fs')
exports.run = async (bot, message, args) =>
{ 
    console.log('parancs le fut!')

    var maxBet = 10000; 

    if(!money[message.author.id] || money[message.author.id].money <= 0) return message.reply('Nem rendelkezel elég pénzzel!');

    if(!args[0]) return message.reply('Kérlek ted meg tétjeid!')

    if(args[0].toLowerCase() == "all") args[0] = money[message.author.id].money;

    try {
        var bet = parseFloat(args[0]);
    } catch {
        return message.reply('Csak egész számokat adhatsz meg!');
    }

    if(bet != Math.floor(bet)) return message.reply('Csak egész számokat adhatsz meg!')

    if(money[message.author.id].money < bet ) return message.reply('Te nem rendelkezel ennyi pénzzel!')

    if(bet > maxBet) return message.reply(`Maximum tét az ${maxBet.toLocaleString()}`)

    let chances = ["win", "lose"]
    var pick = chances[Math.floor(Math.random() * chances.length)];


    if(pick == "lose") {
        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        })
        return message.reply(`Te vesztettél! Új egyenleged: ${money[message.author.id].money}`)
    } else {
            money[message.author.id].money += bet;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            })
            return message.reply(`Te Nyertél! Új egyenleged: ${money[message.author.id].money}`)
    }

}

module.exports.help = {
    name:'mb',
    aliases: []
}