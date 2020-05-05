const createSlot = require('./logics/createSlot');
const addCar = require('./logics/addCar');
const leaveCar = require('./logics/leaveCar');
const checkStatus = require('./logics/checkStatus');

const args = process.argv.splice(2);
const regist_no = args[1];
const slot = args[1];
const leaveTime = args[2];

switch (args[0]) {
    case 'create_parking_lot':
        createSlot(slot);
        break;
    case 'park':
        addCar(regist_no);
        break;
    case 'leave':
        leaveCar(regist_no, leaveTime);
        break;
    case 'status':
        checkStatus();
        break;
    default:
        break;
}