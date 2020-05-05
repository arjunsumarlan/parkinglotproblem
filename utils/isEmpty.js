const reader = require('./readFile');
const { DB_PATH } = require('../constants');

module.exports = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            await reader(DB_PATH, async (parkLot) => {
                try {
                    const emptyParkLot = parkLot.filter((slot) => !slot.regist_no);

                    if (parkLot === undefined || parkLot.length == 0) {
                        return resolve(true);
                    } else if (emptyParkLot.length === parkLot.length) {
                        return resolve(true);
                    }

                    return resolve(false);
                } catch (err) {
                    reject(err.message);
                }
            })
        } catch (err) {
            reject(err.message);
        }
    })
}