const Calculator = require('./calculator');
const assert = require('chai').assert;

describe('Calculator', function () {
    let calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    it('constructor should initialize expenses property as an empty array', function () {
        const expected = [];
        const actual = calculator.expenses;

        assert.deepEqual(actual, expected);
    });

    it('add should add the passed in element (of any type) to the expenses property', function () {
        calculator.add(5);
        calculator.add(true);
        calculator.add('text');
        calculator.add([]);
        calculator.add({});

        const expected = [5, true, 'text', [], {}];
        const actual = calculator.expenses;

        assert.deepEqual(actual, expected);
    });

    it('divideNums should throw error when there are no numbers in the expenses property', function () {
        assert.throw(() => calculator.divideNums());
    });

    it('divideNums returns correct string when the expenses property contains zero', function () {
        calculator.add(2);
        calculator.add(0);

        const expected = 'Cannot divide by zero';
        const actual = calculator.divideNums();

        assert.equal(actual, expected);
    });

    it('divideNums should return the correct result when there are numbers in the expenses property', function () {
        calculator.add(10);
        calculator.add([]);
        calculator.add(5);
        calculator.add(true);

        const expected = 2;
        const actual = calculator.divideNums();

        assert.equal(actual, expected);
    });

    it('toString should return the correct string when there are no elements in the expenses property', function () {
        const expected = 'empty array';
        const actual = calculator.toString();

        assert.equal(actual, expected);
    });

    it('toString should return the correct string when there are elements in the expenses property', function () {
        calculator.add(5);
        calculator.add(true);
        calculator.add('text');
        calculator.add([]);
        calculator.add({});

        const expected = '5 -> true -> text -> [] -> {}';
        const actual = calculator.toString();
    });

    it('orderBy should sort numbers correctly', function () {
        calculator.add(-5.4);
        calculator.add(3.2);
        calculator.add(8);
        calculator.add(-1);

        const expected = '-5.4, -1, 3.2, 8';
        const actual = calculator.orderBy();

        assert.equal(actual, expected);
    });

    it('orderBy should sort mixedData correctly', function () {
        calculator.add(5);
        calculator.add(true);
        calculator.add('text');
        calculator.add([]);
        calculator.add({});

        const expected = '5, true, text, [], {}';
        const actual = calculator.orderBy();
    });
});