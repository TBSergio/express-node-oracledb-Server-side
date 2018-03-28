
var oracledb = require('oracledb');

var queryData = (query,callback) => {

oracledb.outFormat = oracledb.OBJECT;
oracledb.getConnection(
  {
    user          : 'sergei',
    password      : '123456',
    connectString : 'localhost:1522/orc'
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      // The statement to execute
      query,

      // The callback function handles the SQL execution results
      function(err, result)
      {
        if (err) {
          callback(err.message);
          doRelease(connection);
          return;
        }
        callback(result.rows);
        doRelease(connection);
      });
  });
};

// Note: connections should always be released when not needed
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

module.exports = {
    queryData: queryData
};