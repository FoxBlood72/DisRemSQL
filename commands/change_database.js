module.exports = {
    name: 'chdb',
    description: 'Changes database from a mysql server',
    usage: '<key> <database_name>',
    execute(message, args, discodb, mysql)
    {
        if(args.length != 2)
        {
            message.channel.send('Invalid command! Please use the following format: @chdb <KEY> <DATABASE_NAME>');
            return;
        }

        discodb.get_sessionbykey(args[0], message.guild.id, (row) => {
            if(!row)
            {
                message.channel.send("Invalid key!");
                return;
            }

            mysql.test_database(row.server_ip, row.server_port, row.user, row.password, args[1], (err) =>{
                if(err)
                {
                    if(err === -1)
                        message.channel.send("Error while connecting to mysql server! Please refresh mysql server");
                    else
                        message.channel.send("Invalid Database Name! Take a look at your databases @shdb");
                    return;
                }

                discodb.update_database(row.ID, args[1]);
                message.channel.send("Database updated!");

            });

        });

    }

}