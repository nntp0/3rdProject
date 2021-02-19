var WebHDFS = require('webhdfs');

// Create a new
var hdfs = WebHDFS.createClient({
  user: 'hadoop', // Hadoop user
  host: '59.28.30.218', // Namenode host
  port: 20001 // Namenode port
});

module.exports = hdfs;