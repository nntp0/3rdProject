

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');



async function download(){
//     'http://59.28.30.218:20001/webhdfs/v1/user/hadoop/' + fileName + '?op=CREATE'


    const url = 'https://api.exchangeratesapi.io/latest?base=KRW';
    const path = Path.resolve(__dirname, './', 'file01.txt');

    const response = await Axios({

        method : 'GET',
        url : url,
        responseType : 'stream'

    });

    response.data.pipe(Fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })

        response.data.on('error', err => {
            reject(err)
        })
    });
}

download()