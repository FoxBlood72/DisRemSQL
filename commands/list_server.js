module.exports = {
    name: 'shsv',
    description: 'List all mysql servers for user',
    usage: '',
    execute(message, args, discodb, mysql){
        discodb.get_connections(message.guild.id, (rows) => {
            /*
            JsonToCsv = require('../util/json2csvparser');
            JsonToCsv(['server_ip', 'server_port', 'switchkey'], rows);
            */

            
            JsonToTable = require('../util/json2table.js');
            JsonToTable(['IP', 'PORT', 'USER', 'KEY', 'DATABASE'], rows, (table) => {
                message.channel.send(table);
            });
            



        });
    }
}