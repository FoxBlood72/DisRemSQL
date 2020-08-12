module.exports = {
    name: 'addserver',
    aliases: ['addsv'],
    usage: '<ip>:<port> <username> <password>',
	description: 'Add server in database by providing ip, port, username and password',
	execute(message, args, discodb, mysql){
        if(args.length != 3)
        {
            message.channel.send('Invalid command! Please use the following format: @addserver [IP]:[PORT] [USER] [PASS]');
            return;
        }

        ip_port = args[0].split(':');
        message.delete().then().catch( (error) => {
            if(error.code === 50013)
                message.channel.send("WARNING: PLEASE GIVE ME PERMISSION FOR DELETING THE MESSAGE IN FUTURE");
            else
                if(!error)
                    message.channel.send('Your message was deleted for security reason');
                    else
                        console.log('Error while deleting the message' + error);

        } );
        discodb.is_connection(ip_port[0], ip_port[1], args[1], message.guild.id, (connection) =>{
            if(connection)
            {
                message.channel.send('This server and user was already added');
                return;
            }


            mysql.test_connection(ip_port, args[1], args[2], (err) => {

                if(err)
                {
                    if(err == -1)
                        message.channel.send('Invalid ip or port, please enter the correct ip and port');
                    else
                        message.channel.send("**MySql error:** " + err.sqlMessage);
                    return;
                }

                randkey = require("../util/random.js");
                const key = randkey(6);
                discodb.insert_connection(ip_port[0], ip_port[1], args[1], args[2], message.guild.id, key);

                

                message.channel.send('MySQL server added! Please remember this key for future use: ' + key);
        
            });

            

            
            
         });

    },
};