const fs = require('fs');

module.exports = function (source, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(source, JSON.stringify(data), (err) => {
            if (err) {
                console.log('Error writing file:', err);
                reject(err);
            } else {
                resolve(true)
            }
        })
    });
}