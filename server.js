
var oracledb = require('oracledb');

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
      `SELECT *
       FROM employee
       `,

      // The callback function handles the SQL execution results
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log('------------------------------------\nEmployee table contains:\n------------------------------------')
        console.log(result.rows);     
        console.log('------------------------------------');
        doRelease(connection);
      });
  });

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