const Discord = require('discord.js');
const bot_config = require("./config.json");

const bot_dis = new Discord.Client();
bot_dis.commands = new Discord.Collection();

const discord_db = require('./database/db_core.js');
const discodb = new discord_db();


const mysql_core = require('./util/mysqlplatform');
const mysql = new mysql_core();

const permbot = require('./util/perm');



const file_sys = require('fs');
const command_files = file_sys.readdirSync('./commands').filter(file => file.endsWith('.js'));


for(const command_file of command_files)
{
    const command = require(`./commands/${command_file}`);
    bot_dis.commands.set(command.name, command);
}


bot_dis.on('message', (message) =>{
    if (!message.content.startsWith(bot_config.prefix) || message.author.bot) 
        return;

    if(!permbot.checkPermission(message, discodb))
    {
        message.reply("You do not have permission to access din command!");
        return;
    }

    if(!message.content.startsWith(bot_config.prefix + 'sql'))
    {
        const args = message.content.slice(bot_config.prefix.length).trim().split(' ');
        var commandName = args.shift().toLowerCase();
        
        const cmd = bot_dis.commands.get(commandName) 
        || bot_dis.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); 

        if(!cmd)
            return;

        commandName = cmd.name;
        

        if(message.channel.type !== 'text' && !message.content.startsWith(bot_config.prefix + 'help'))
        {
            message.channel.send('You are not allowed to execute this command here!');
            return;
        }

        try {
            bot_dis.commands.get(commandName).execute(message, args, discodb, mysql);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

    }
    else
    {
        try {
            bot_dis.commands.get('sql').execute(message, bot_config, discodb, mysql);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }


});

bot_dis.on('ready', () => {
    console.log('Bot is ready!');

})


bot_dis.login(bot_config.bot_token);