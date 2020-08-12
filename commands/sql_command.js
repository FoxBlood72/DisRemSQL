const hastebin = require("hastebin-post");

module.exports = {
	name: 'sql',
	description: 'Execute one SQL command',
	usage: '<SQL SYNTAX>',
	execute(message, bot_config, discodb, mysql){

		const author_id = message.author.id;
		const guildid = message.guild.id;
        
		const sql = message.content.slice(bot_config.prefix.length + 4).trim();
		//console.log(sql);
		discodb.is_session(author_id, guildid, (session) => {
			if(!session)
			{
				message.channel.send("Please switch to a connection. @chcon [KEY]");
				return;
			}

			discodb.get_session(author_id, guildid, (err, row) => {
				if(!row)
				{
					message.channel.send("Error fetching connection. Please switch to a connection. @chcon [KEY]");
					return;
				}

				mysql.execute_statement(row.server_ip, row.server_port, row.user, row.password, row.database, sql, (err, result) =>{
					if(err)
					{
						if(err === -1)
						{
							message.channel.send("Error while connecting to mysql server! Please refresh mysql server");
							return;
						}

						if(err.errno === 1046)
							message.channel.send("Please select a database by using @chdb command\nYou can view databases by using @shdb command");
						else
							message.channel.send(err.sqlMessage);
						return;
					}

				

				//console.log(result.affectedRows);

				if(typeof result.affectedRows != 'number')
				{
					header_table = [];
					for(fields_name in result[0])
						header_table.push(fields_name);

					JsonToTable = require('../util/json2table.js');
					JsonToTable(header_table, result, (table, over_lim) => {
						if (!over_lim)
							message.channel.send(table);
						else
							hastebin(table).then((url) => {
								url = 'File too big! Uploaded to the following link: ' + url;
								message.channel.send(url);
							});
						});
				}
				else
				{
					message.channel.send("Execution Complete! Affected rows: " + result.affectedRows);
				}

				});
				
				
			});

		});
		
    },
};