const SubscriptionCard = require('./subscription-card');
const assert = require('chai').assert;

describe('SubscriptionCard', function () {
    let subscriptionCard;

    beforeEach(function () {
        subscriptionCard = new SubscriptionCard('Pesho', 'Petrov', '00000000');
    });

    it('constructor should initialize correctly', function () {
        assert.equal(subscriptionCard.firstName, 'Pesho');
        assert.equal(subscriptionCard.lastName, 'Petrov');
        assert.equal(subscriptionCard.SSN, '00000000');
    });

    it('user should not be able to set firstName property', function () {
        subscriptionCard.firstName = 'Gosho';

        const expected = 'Pesho';
        const actual = subscriptionCard.firstName;

        assert.equal(actual, expected);
    });

    it('user should not be able to set lastName property', function () {
        subscriptionCard.lastName = 'Ivanov';

        const expected = 'Petrov';
        const actual = subscriptionCard.lastName;

        assert.equal(actual, expected);
    });

    it('user should not be able to set SSN property', function () {
        subscriptionCard.SSN = '0123';

        const expected = '00000000';
        const actual = subscriptionCard.SSN;

        assert.equal(actual, expected);
    });

    it('isBlocked should return false if card is not blocked', function () {
        subscriptionCard.block();
        subscriptionCard.unblock();

        const expected = false;
        const actual = subscriptionCard.isBlocked;

        assert.equal(actual, expected);
    });

    it('isBlocked should return true if card is blocked', function () {
        subscriptionCard.block();

        const expected = true;
        const actual = subscriptionCard.isBlocked;

        assert.equal(actual, expected);
    });

    it('isValid should return false if card is blocked', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.block();

        const expected = false;
        const actual = subscriptionCard.isValid('120', new Date('2018-04-22'));

        assert.equal(actual, expected);
    });

    it('isValid should return false if card expiration date passed', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));

        assert.equal(subscriptionCard.isValid('120', new Date('2018-06-22')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-06-22')), false);
    });

    it('isValid should return false if card expiration date passed and line is set to *', function () {
        subscriptionCard.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));

        assert.equal(subscriptionCard.isValid('120', new Date('2018-06-22')), false);
        assert.equal(subscriptionCard.isValid('*', new Date('2018-06-22')), false);
    });

    it('isValid should return true if card expiration date didn\'t pass', function () {
        subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        subscriptionCard.addSubscription('*', new Date('2018-03-22'), new Date('2018-06-24'));

        assert.equal(subscriptionCard.isValid('120', new Date('2018-03-22')), true);
        assert.equal(subscriptionCard.isValid('120', new Date('2018-06-24')), true);

        assert.equal(subscriptionCard.isValid('120', new Date('2018-03-21')), false);
        assert.equal(subscriptionCard.isValid('120', new Date('2018-06-25')), false);
    });
});