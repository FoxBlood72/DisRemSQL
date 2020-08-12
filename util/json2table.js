module.exports = function JsonToTable(coloms_name, rows_data, callback)
{
    const escape_data = require('./discoscape.js');
    var Table = require('cli-table3');
    var table = new Table({
        head: coloms_name,
        style : {
            head: [],
            border: []
        }
    });

    rows_data.forEach((row) => {
        table_row = [];
        for(var field_name in row)
            table_row.push(row[field_name]);

        table.push(table_row);
    });
    table_string = table.toString();

    let over_limit = true;
    if(table_string.length + 6 < 2000)
    {
        table_string = escape_data(table_string);
        table_string += '```';
        table_string = '```' + table_string;
        over_limit = false;
    }

    callback(table_string, over_limit);
    
}