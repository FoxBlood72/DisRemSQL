class mysqlplatform{
    constructor()
    {
        this.mysql = require('mysql');
    }

    test_connection(ip_port, username, pwd, callback)
    {
        
        let mysqlconnection = this.mysql.createConnection({
            host: ip_port[0],
            port: ip_port[1],
            user: username,
            password: pwd,
            connectTimeout: 1000
        });

        /* For some reason when I type an wrong ip 
        connect() function does not throw an error
        */
        let connected = false;
        mysqlconnection.connect((err) => {
            //console.log(err);
            connected = true;
            return callback(err ? err : false);
        });


        setTimeout(() => {
            mysqlconnection.destroy();
            if(!connected)
                return callback(-1);

            
        }, 500);

        //return callback(-1);
    }

    get_databases(ip, port, username, pwd, callback)
    {
        
        var mysqlconnection = this.mysql.createConnection({
            host: ip,
            port: port,
            user: username,
            password: pwd,
            connectTimeout: 10000
        });


        let connected = false;
        mysqlconnection.connect((err) => {
            if(err)
                return callback(err, undefined);
            
            connected = true;
            mysqlconnection.query(`SHOW DATABASES;`, (err, result) => {
                if(err)
                    callback(err, undefined);

                callback(err,result);
            });
            
        });

        setTimeout(() => {
            mysqlconnection.destroy();
            if(!connected)
                return callback(-1);

            
        }, 500);

    }


    test_database(ip, port, user, password, db, callback)
    {
        var mysqlconnection = this.mysql.createConnection({
            host: ip,
            port: port,
            user: user,
            password: password,
            database: db,
            connectTimeout: 1000
        });


        let connected = false;
        mysqlconnection.connect((err) => {

            connected = true;
            return callback(err ? err : false);
        });


        setTimeout(() => {
            mysqlconnection.destroy();
            if(!connected)
                return callback(-1);

            
        }, 500);
    }

    execute_statement(ip, port, user, pass, db, sql, callback)
    {
        var mysqlconnection = this.mysql.createConnection({
            host: ip,
            port: port,
            user: user,
            password: pass,
            database: db,
            connectTimeout: 1000
        });


        let connected = false;
        mysqlconnection.connect((err) => {
            connected = true;
            if(err)
            {
                callback(err, undefined);
                return;
            }


            mysqlconnection.query(sql, (err, result, fields) => {
                //console.log(err);
                if(err)
                    return callback(err, undefined);
                
                //console.log(result);
                return callback(err, result);
            });

        });

        setTimeout(() => {
            mysqlconnection.destroy();
            if(!connected)
                return callback(-1);

            
        }, 500);

    }


}


module.exports = mysqlplatform;