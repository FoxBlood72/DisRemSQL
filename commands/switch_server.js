module.exports = {
    name: "chcon",
    description: "Switchs the user to another mysql server/user",
    usage: '<key>',
    execute(message, args, discodb, mysql){
        if(args.length != 1)
        {
            message.channel.send('Invalid command! Please use the following format: @switch [KEY]');
            return;
        }

        const author_id = message.author.id;
        const guildid = message.guild.id;

        discodb.get_sessionbykey(args[0], message.guild.id, (rowconn) => {
        
        if(!rowconn)
        {
            message.channel.send("Invalid key!");
            return;
        }

        discodb.is_session(author_id, guildid, (session) => {
            if(!session)
            {
                discodb.insert_session(rowconn.ID, author_id, guildid);
                message.channel.send(`**Changed to:** ` + args[0] + `\n**Current database:**: ` + (rowconn.database || "none"));

                return;
            }

            discodb.update_session(rowconn.ID, author_id, guildid);
            message.channel.send(`**Changed to:** ` + args[0] + `\n**Current database:**: ` + (rowconn.database || "none"));

        });


    });

    }

};