const AutoService = require('./auto-service');
const assert = require('chai').assert;

describe('AutoService Tests', function () {
    let autoService;

    beforeEach(function () {
        autoService = new AutoService(10);
    });

    it('constructor should set all properties correctly', function () {
        assert.equal(autoService.garageCapacity, 10);
        assert.deepEqual(autoService.workInProgress, []);
        assert.deepEqual(autoService.backlogWork, []);
    });

    it('availableSpace should return the correct value', function () {
        assert.equal(autoService.availableSpace, 10);
    });

    it('signUpForReview should add current client to workInProgress when there is an available space', function () {
        autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

        let currentClient = {
            plateNumber : 'Peter',
            clientName: 'CA1234CA',
            carInfo: {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}
        };

        const expected = currentClient.toString();
        const actual = autoService.workInProgress[0].toString();

        assert.equal(actual, expected);
    });

    it('signUpForReview should add current client to backlogWork when there is not an available space', function () {
        autoService = new AutoService(0);
        autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

        let currentClient = {
            plateNumber : 'Peter',
            clientName: 'CA1234CA',
            carInfo: {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}
        };

        const expected = currentClient.toString();
        const actual = autoService.backlogWork[0].toString();

        assert.equal(actual, expected);
    });

    it('carInfo should return the correct string when the searched car is not found', function () {
        const expected = 'There is no car with platenumber PB9999PB and owner PHILIP.';
        const actual = autoService.carInfo('PB9999PB', 'PHILIP');

        assert.equal(actual, expected);
    });

    it('carInfo should return the car object when the searched car is found in workInProgress', function () {
        autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

        const expected = {
            plateNumber : 'Peter',
            clientName: 'CA1234CA',
            carInfo: {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}
        };

        const actual = autoService.carInfo('CA1234CA', 'Peter');

        assert.equal(actual.toString(), expected.toString());
    });

    it('carInfo should return the car object when the searched car is found in backlogWork', function () {
        autoService = new AutoService(0);
        autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

        const expected = {
            plateNumber : 'Peter',
            clientName: 'CA1234CA',
            carInfo: {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'}
        };

        const actual = autoService.carInfo('CA1234CA', 'Peter');

        assert.equal(actual.toString(), expected.toString());
    });

    it('repairCar should return the correct string when there are no cars in the service', function () {
        const expected = 'No clients, we are just chilling...';
        const actual = autoService.repairCar();

        assert.equal(actual, expected);
    });

    it('repairCar should return the correct string when there are no broken parts', function () {
        autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});

        const expected = 'Your car was fine, nothing was repaired.';
        const actual = autoService.repairCar();

        assert.equal(actual, expected);
    });

    it('repairCar should return the correct string when there is part', function () {
        autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});

        const expected = 'Your doors were repaired.';
        const actual = autoService.repairCar();

        assert.equal(actual, expected);
    });
});