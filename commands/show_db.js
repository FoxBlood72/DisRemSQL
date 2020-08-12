module.exports = {
    name: 'shdb',
    description: 'Shows all databases from a gived mysql server by key',
    usage: '<key>',
    execute(message, args, discodb, mysql)
    {
        if(args.length != 1)
        {
            message.channel.send('Invalid command! Please use the following format: @shdb [KEY]');
            return;
        }

        discodb.get_sessionbykey(args[0], message.guild.id, (row) => {
            if(!row)
            {
                message.channel.send('Invalid server key!');
                return;
            }

            
            mysql.get_databases(row.server_ip, row.server_port, row.user, row.password, (err, result) => {
                if(err)
                {
                    message.channel.send("Error while connecting to mysql server! Please refresh mysql server");
                    return;
                }
                
                header_table = [];
                for(fields_name in result[0])
                    header_table.push(fields_name);

                

                JsonToTable = require('../util/json2table.js');
                JsonToTable(header_table, result, (table) => {
                    
                    message.channel.send(table);
                });
            });

        });


    }

}