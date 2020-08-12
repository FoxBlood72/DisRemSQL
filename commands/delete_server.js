module.exports = {
    name: 'rmsv',
    description: 'Deletes mysql server by key',
    usage: '<key>',
    execute(message, args, discodb, mysql){
        if(args.length != 1)
        {
            message.channel.send("Invalid command! Please use the following format: @rmsv <KEY>");
            return;
        }

        discodb.get_sessionbykey(args[0], message.guild.id, (rowconn) => {
            if(!rowconn)
            {
                message.channel.send('Invalid key!');
                return;
            }

            discodb.remove_connection(rowconn.ID);
            message.channel.send('MySQL server/user deleted!');

        });

    },
}