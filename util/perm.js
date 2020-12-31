module.exports = {
    
    checkPermission: function(message, discodb){
    /*
        discodb.get_roles(message.guild.id, (err, rows) => {
            console.log(rows);
        });
    */
        return (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES') ? true : false);
            
    },

    addPermissionRole: function(message, discodb){

    },

    removePermissionRole: function(message, discodb){

    },

    gerPermissionRoles: function(message, discodb){

    }

}