const discord = require('discord.js');
const commando = require('discord.js-commando')
const moment = require('moment')
const botconfig = require('./botconfig.json')
const fs = require('fs')
var bot = new commando.Client ({
    disabledEvryone: true,
    unknownCommandResponse: false
});
//FILE SYSTEM
bot.on('message', message => {


    let prefixek = JSON.parse(fs.readFileSync("./prefixek.json", "utf8"));
    if(!prefixek[message.guild.id]) {
        prefixek[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixek[message.guild.id].prefix;

    //ARGS

    let messageArry = message.content.split(" ");
    let cmd = messageArry[0];
    let args = messageArry.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)

    //CHECK CHANNEL TYPE

    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;

    //CHECK PREFIX, DEFINE ARGS & COMMAND

    // RUN COMMANDS 

   if(bot.commands.has(cmd)) {
       command = bot.commands.get(cmd);
   } else if (bot.aliases.has(cmd)) {
       commands = bot.commands.get(bot.aliases.get(cmd));
   }
    try {
        command.run(bot, message, args);
    } catch(e) {
        return
    }
});

//-------------------------------------

//READ COMMAND FOLDER

fs.readdir("./commands/", (err,files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log('nem találni ilyen parancsot!')
        return
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} Betöltve!`)
        bot.commands.set(props.help.name, props);


        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();


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

