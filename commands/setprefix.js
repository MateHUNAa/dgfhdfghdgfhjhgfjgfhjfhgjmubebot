const Discord = require('discord.js');
const fs = require('fs')
const botconfig = require('../botconfig.json')
const colors = require('../color.json')

exports.run = async (bot, message, args, moment) =>
{ 

    let prefixek = JSON.parse(fs.readFileSync("./prefixek.json", "utf8"));
    if(!prefixek[message.guild.id]) {
        prefixek[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixek[message.guild.id].prefix;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Te nem tudod meg változtatni a bot prefixét!')

    if(!args[0]) return message.reply('Kérlek adj meg egy prefixet.')

    prefixek[message.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("./prefixek.json", JSON.stringify(prefixek), (err) => {
        if (err) console.log(err)
    })

    let embed = new Discord.RichEmbed()
    embed.setColor(colors.világos_zöld)
    embed.setTitle('PREFIX VÁLTOZOTT!')
    embed.setDescription(`A prefix erre változott: ${args[0]}`)

    message.channel.send(embed)

}

module.exports.help = {
    name: "setprefix",
    aliases: ["prefix"]
}
