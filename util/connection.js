var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({
            connectionLimit:  10,
            host:             'localhost',
            user:             'db_gardener',
            password:         'KTgdXz3SSMCY',
            database:         'pi_garden'
        });
    };

  this.acquire = function(callback) {
      this.pool.getConnection(function(err, connection) {
          connection.config.queryFormat = function (query, values) {
              if (!values) return query;
              return query.replace(/\:(\w+)/g, function (txt, key) {
                  if (values.hasOwnProperty(key)) {
                      return this.escape(values[key]);
                  }
                  return txt;
              }.bind(this));
          }
          callback(err, connection);
      });
  };
}

module.exports = new Connection();
