const update = require('../utils/updateFile');
const isCarExist = require('../utils/checkExistCar');
const { FIRST_HOURS, PRICE } = require('../constants')

module.exports = async function (regist_no, leaveTime) {
    try {
        if (!(await isCarExist(regist_no))) {
            console.log(`Registration number ${regist_no} not found`);
            return;
        }

        await update(async (slots) => {
            return new Promise(function (resolve, reject) {
                try {
                    const existSlots = slots.splice(0);
                    const choosenSlot = existSlots.find((slot) => slot.regist_no === regist_no);
                    const choosenSlotIdx = existSlots.indexOf(choosenSlot);
                    existSlots[choosenSlotIdx] = {
                        no: choosenSlot.no
                    };

                    let charge = PRICE;

                    if (leaveTime > FIRST_HOURS) {
                        charge += Math.ceil(leaveTime - FIRST_HOURS) * PRICE;
                    }

                    console.log(`Registration number ${choosenSlot.regist_no} with Slot Number ${choosenSlot.no} is free with Charge ${charge}`);

                    return resolve(existSlots);

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