const reader = require('./readFile');
const { DB_PATH } = require('../constants');

module.exports = function (regist_no) {
    return new Promise(async function (resolve, reject) {
        try {
            await reader(DB_PATH, async (data) => {
                try {
                    const existData = data.find((slot) => slot.regist_no === regist_no)
                    if (existData) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } catch (err) {
                    reject(err.message);
                }
            })
        } catch (err) {
            reject(err.message);
        }
    })
}