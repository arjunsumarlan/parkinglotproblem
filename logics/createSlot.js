const update = require('../utils/updateFile');

module.exports = async function (slot) {
    try {
        if (Number(slot) > 100000) {
            console.log('requested lot is over capacity');
            return;
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
    } catch (err) {
        switch (err.message) {
            case 'Invalid array length':
                console.log('Please input positive number of slot')
                break;
            // TODO: Add other error handling...
            default:
                break;
        }
    }
}