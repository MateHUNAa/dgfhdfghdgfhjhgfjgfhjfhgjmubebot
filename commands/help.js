const Discord = require('discord.js');

const colors = require('../color.json')

exports.run = async (bot, message, args, moment) =>
{ 

    const embed = new Discord.RichEmbed()
    .setColor(colors.világos_zöld)
    .setTitle('PARANCSOK')
    .addField('**?mb**', 'Játék')
    .addField('**?balance**', 'le írja mennyi pénzed van.')
    .addField('**?pay**', 'Át tudsz utali pénzt!')
message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    aliases: []
}
