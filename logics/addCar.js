const update = require('../utils/updateFile');
const isCarExist = require('../utils/checkExistCar');

module.exports = function (regist_no) {
    return new Promise(async function (resolveCar, reject) {
        try {
            if (await isCarExist(regist_no)) {
                console.log('Car already parked');
                return resolveCar('Car already parked');
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

                            resolveCar({
                                ...availSlot,
                                regist_no
                            });
                            return resolve(newSlots);
                        } else {
                            console.log('Sorry, parking lot is full');
                            resolveCar('Sorry, parking lot is full');
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
            reject(err.message);
        }
    })
}