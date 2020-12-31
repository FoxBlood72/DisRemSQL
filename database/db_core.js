class discord_db{
    constructor(){
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database('./database/disco.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE ,(err) =>{
            if(err)
            {
                console.log("Error while opening the database");
                console.error(err.message);
            }
            console.log("Database Connected Succefuly");
        });
        
        this.prepare_database();
    }

    prepare_database(){
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS sqlcon(ID INTEGER PRIMARY KEY AUTOINCREMENT,
                server_ip VARCHAR(255), server_port INT, user VARCHAR(255), password VARCHAR(255), 
                switchkey VARCHAR(255), guildid VARCHAR(255), database VARCHAR(255))`)
                   .run(`CREATE TABLE IF NOT EXISTS allowedroles(ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                        role VARCHAR(255), guildid VARCHAR(500))`)
                   .run(`CREATE TABLE IF NOT EXISTS sessions(ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                        userid VARCHAR(400), connection INT, guildid VARCHAR(250))`);
        })
    }

    is_session(user_id, guildid, callback)
    {
        this.db.get(`SELECT * FROM sessions WHERE userid = ? AND guildid = ?`, [user_id, guildid], (err, row) => {
            if(err)
            {
                console.log("ERROR GETING SESSION");
                console.error(err);
                return;
            }

            

            return callback(row ? row : false);

        });
    }

    insert_session(connection, userid, guildid)
    {
        this.db.run(`INSERT INTO sessions VALUES(NULL, ?, ?, ?)`,[userid, connection, guildid], (err) =>{
            if(err)
            {
                console.log("ERROR WHILE INSERTING SESSION");
                console.error(err);
                return;
            }
        });
    }


    update_session(connection, userid)
    {
        this.db.run(`UPDATE sessions SET connection = ? WHERE userid = ?`, [connection, userid], (err) =>{
            if(err)
            {
                console.log("ERROR IN UPDATING SESSION");
                console.error(err);
                return;
            }
        });

    }

    get_sessionbykey(switchkey, guild_id, callback)
    {

        this.db.get(`SELECT * FROM sqlcon WHERE switchkey = ? AND guildid = ?`, [switchkey, guild_id], (err, row) => {
            if(err)
            {
                console.log("ERROR GETTING THE CONNECTION ID");
                console.error(err);
            }
            return callback(row ? row : false);
        });

    }

    insert_connection(server_ip, server_port, username, password, guild_id, key)
    {

        this.db.run(`INSERT INTO sqlcon VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)`, [server_ip, server_port, username, password, key, guild_id, null], (err) => {
            if(err)
            {
                console.log("ERROR INSERTING CONNECTION");
                console.error(err);
            }

            

        });
    }

    is_connection(server_ip, server_port, username, guild_id, callback)
    {
        this.db.get(`SELECT * FROM sqlcon WHERE server_ip = ? AND server_port = ? 
        AND user = ? AND guildid = ?`, [server_ip, server_port, username, guild_id], (err, row) => {
            if(err)
            {
                console.log("ERROR IN CHECKING SERVER");
                console.error(err);
                return;
            }

            
            
            return callback(row ? true : false);
        });
    }

    remove_connection(ID)
    {
        this.db.run(`DELETE FROM sqlcon WHERE ID = ?`, [ID], (err) => {
            if(err)
            {
                console.log("ERROR IN REMOVING CONNECTION");
                console.error(err);
            }
        });
    }


    get_connections(guild_id, callback)
    {
        this.db.all(`SELECT server_ip, server_port, user, switchkey, database 
        FROM sqlcon WHERE guildid = ?`, [guild_id], (err, rows) => {
            if(err)
            {
                console.log("ERROR IN GETING ROWS FOR CONNECTIONS");
                console.error(err);
                return;
            }
            return callback(rows);
        });
    }

    update_database(connection_id, database_name)
    {
        this.db.run(`UPDATE sqlcon SET database = ? WHERE ID = ?`,[database_name, connection_id], (err) => {
            if(err)
            {
                console.log("Error while updating databases");
                console.error(err);
                return;
            }


        });
    }

    get_session(userid, guildid, callback)
    {
        this.db.get(`SELECT sqlcon.server_ip, sqlcon.server_port, sqlcon.user, sqlcon.password, sqlcon.guildid, sqlcon.database, sqlcon.switchkey 
        FROM sqlcon
        INNER JOIN sessions ON sqlcon.ID = sessions.connection 
        WHERE sessions.userid = ? AND sessions.guildid = ?`,[userid, guildid], (err, row) => {
            if(err)
            {
                console.log("ERROR WHILE GETTING SESSION");
                console.error(err);
                return callback(err, undefined);
            }

            
            return callback(err, row);
        });
    }

    insert_role(guildid, role, callback)
    {
        this.db.run(`INSERT INTO allowedroles(role, guildid) VALUES(?, ?)`, [role, guildid], (err) =>{
            if(err)
            {
                console.log("ERROR WHILE INSERTING ROLE");
                console.error(err);
            }
            return callback(err);
        });
    }

    check_role_exist(guildid, role, callback)
    {
        this.db.get(`SELECT * FROM allowedroles WHERE role = ? AND guildid = ?`, [role, guildid], (err, row)=>{
            if(err)
            {
                console.log("ERROR WHILE CHECKING ROLE");
                console.error(err);
            }
            return callback(err, row);
        });
    }

    delete_role(id, callback)
    {
        this.db.run(`DELETE FROM allowedroles WHERE ID = ?`, [id], (err) => {
            if(err)
            {
                console.log("ERROR WHILE DELETING ROLE");
                console.error(err);
            }
            return callback(err);
        });
    }

    get_roles(guildid, callback)
    {
        this.db.all(`SELECT role FROM allowedroles WHERE guildid = ?`, [guildid], (err, rows) => {
            if(err)
            {
                console.log("ERROR WHILE GETING ROLES");
                console.error(err);
            }
            return callback(err, rows);
        })
    }

}


//DiscoDb = new discord_db();

module.exports = discord_db;
