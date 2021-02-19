var hdfs = require('./webhdfs-client');
var fs = require('fs');

var createFile = (localURL, remoteURL) => {
    var localFileStream = fs.createReadStream(localURL);
    var remoteFileStream = hdfs.createWriteStream(remoteURL);

    localFileStream.pipe(remoteFileStream);

    remoteFileStream.on('error', function onError (err) {
    // Do something with the error
    });

    remoteFileStream.on('finish', function onFinish () {
    // Upload is done
    });
}

var openFile = (remoteURL, callback) => {
    var remoteFileStream = hdfs.createReadStream(remoteURL);
    var data = ""

    remoteFileStream.on('error', function onError (err) {
    });

    remoteFileStream.on('data', function onChunk (chunk) {
        data = data + chunk
    });

    remoteFileStream.on('finish', function onFinish () {
        callback(data.toString())
    });
}

exports.createFile = createFile
exports.openFile = openFile