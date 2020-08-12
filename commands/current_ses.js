module.exports = {
    name: 'session',
    aliases: ['ses'],
    description: 'Displays the current session key to user',
    execute(message, args, discodb, mysql){
        const authorid = message.author.id;
        const guildid = message.guild.id;

        discodb.get_session(authorid, guildid, (err, row) => {
            if(!row)
            {
                message.channel.send('You have not set your session. You can do it by using chcon command');
                return;
            }

            delete row.password;
            delete row.guildid;


            row_arr = [];
            row_arr.push(row);



            JsonToTable = require('../util/json2table.js');
            JsonToTable(['IP','PORT','USER','DATABASE', 'KEY'], row_arr, (table) => {    
                message.channel.send('You have the following session');
                message.channel.send(table);
            });

        });

    },
}