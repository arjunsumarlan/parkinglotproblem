const createSlot = require('../../logics/createSlot');
const addCar = require('../../logics/addCar');
const reader = require('../../utils/readFile');
const leaveCar = require('../../logics/leaveCar');
const { DB_PATH } = require('../../constants');

describe("create a slot", () => {
    it("should create given number of slot", async () => {
        await createSlot(6);
        await reader(DB_PATH, async (data) => {
            expect(data.length).toBe(6);
        });
        await createSlot(2);
        await reader(DB_PATH, async (data) => {
            expect(data.length).not.toBe(6);
            expect(data.length).toBe(2);
        });
    });

    it("should create nonzero positive number of slot", async () => {
        const err = await createSlot(-6);
        expect(err).toBe('Please input nonzero positive number of slot');
    });

    it("should create less than 10^5 of slot", async () => {
        const err = await createSlot(1000000);
        expect(err).toBe('requested lot is over capacity');
    });
});

describe("park a car", () => {
    it("should park a car", async () => {
        const addedCar = await addCar("KA-01-P-333")
        expect(JSON.stringify(addedCar)).toBe('{"no":1,"regist_no":"KA-01-P-333"}');
    });

    it("should park other car", async () => {
        const anotherCar = await addCar("KA-01-P-300")
        expect(JSON.stringify(anotherCar)).toBe('{"no":2,"regist_no":"KA-01-P-300"}');
    });

    it("should not park same car", async () => {
        const sameCar = await addCar("KA-01-P-300")
        expect(sameCar).toBe('Car already parked');
    });

    // We already park two car
    it("should not park a car when parking lot is full", async () => {
        const rejectedCar = await addCar("KA-01-P-400")
        expect(rejectedCar).toBe('Sorry, parking lot is full');
    });
});

describe("unpark a car", () => {
    it("should unpark a car with 5 hours parking time and charge $40 ", async () => {
        const removedCar = await leaveCar("KA-01-P-333", 5)
        expect(JSON.stringify(removedCar)).toBe('{"no":1,"regist_no":"KA-01-P-333","charge":40}');
    });

    it("should unpark not exist car", async () => {
        const notExistCar = await leaveCar("KA-01-P-333")
        expect(notExistCar).toBe('Registration number KA-01-P-333 not found');
    });
});