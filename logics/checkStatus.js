const reader = require('../utils/readFile');
const isEmpty = require('../utils/isEmpty');
const { DB_PATH } = require('../constants');

module.exports = async function () {
    try {
        if (await isEmpty()) {
            console.log('Parking lot is empty');
            return;
        }

        await reader(DB_PATH, async (data) => {
            const filteredData = data.filter((item) => item.regist_no);
            const showData = filteredData.map(item => {
                return {
                    'Slot No.': item.no,
                    'Registration No.': item.regist_no
                };
            })
            console.table(showData);
        })
    } catch (err) {
        console.log(err.message);
    }
}