const update = require('../utils/updateFile');
const isCarExist = require('../utils/checkExistCar');

module.exports = async function (regist_no) {
    try {
        if (await isCarExist(regist_no)) {
            console.log('Car already parked');
            return;
        }

        await update(async (slots) => {
            return new Promise(function (resolve, reject) {
                try {
                    const newSlots = slots.splice(0);
                    const availSlot = newSlots.find((slot) => !slot.regist_no);

                    if (availSlot && availSlot.no) {
                        const availSlotIdx = newSlots.indexOf(availSlot);
                        newSlots[availSlotIdx] = {
                            ...availSlot,
                            regist_no
                        };

                        console.log(`Allocated slot number: ${availSlot.no}`)

                        return resolve(newSlots);
                    } else {
                        console.log('Sorry, parking lot is full');
                        return resolve(newSlots);
                    }

                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            })
        })
    } catch (err) {
        console.log(err.message);
    }
}