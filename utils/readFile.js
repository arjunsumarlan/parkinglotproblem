const fs = require('fs');

module.exports = function (filePath, cb) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                console.log('Error reading file:', err);
                return reject(err);
            }
            try {
                const object = JSON.parse(fileData);
                return cb && resolve(cb(object));
            } catch (err) {
                console.log('Error reading file:', err);
                return reject(err);
            }
        })
    })
}