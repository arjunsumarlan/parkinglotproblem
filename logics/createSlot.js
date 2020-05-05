const update = require('../utils/updateFile');

module.exports = async function (slot) {
    return new Promise(async function (resolve, reject) {
        try {
            if (Number(slot) <= 0) {
                console.log('Please input nonzero positive number of slot');
                return resolve('Please input nonzero positive number of slot');
            }

            if (Number(slot) > 100000) {
                console.log('requested lot is over capacity');
                return resolve('requested lot is over capacity');
            }

            const createStatus = await update(async (data) => {
                return new Promise(function (resolve, reject) {
                    try {
                        let newData = data.splice(0);
                        newData.splice(0, newData.length);
                        for (var i = 1; i <= slot; i++) {
                            newData.push({
                                no: i
                            });
                        }
                        resolve(newData);
                    } catch (error) {
                        reject(error);
                    }
                })
            })

            if (createStatus) {
                console.log(`Created parking lot with ${slot} slots`)
            }

            resolve(createStatus);
        } catch (err) {
            reject(err.message);
        }
    })
}