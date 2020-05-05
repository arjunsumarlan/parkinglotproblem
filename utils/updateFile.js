const writer = require('./writeFile');
const reader = require('./readFile');
const { DB_PATH } = require('../constants');

module.exports = async function (callback) {
    return new Promise(async function (resolve, reject) {
        try {
            await reader(DB_PATH, async (data) => {
                try {
                    const newData = await callback(data);
                    const status = await writer(DB_PATH, newData);
                    resolve(status);
                } catch (err) {
                    reject(err.message);
                }
            })
        } catch (err) {
            reject(err.message);
        }
    })
}