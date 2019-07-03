let Warehouse = require('./warehouse');
let assert = require('Chai').assert;

describe('Warehouse', function () {
    let warehouse;

    beforeEach(function () {
        warehouse = new Warehouse(10);
    });

    it("constructor should throw string when the value is invalid", function () {
        assert.throws(() => warehouse = new Warehouse(''), `Invalid given warehouse space`);
        assert.throws(() => warehouse = new Warehouse(0), `Invalid given warehouse space`);
        assert.throws(() => warehouse = new Warehouse(-10), `Invalid given warehouse space`);
    });

    it('addProduct should throw string when there is not enough place for the product', function () {
        assert.throws(() => warehouse.addProduct('Drink', 'Cola', 15),
            `There is not enough space or the warehouse is already full`);
    });

    it('orderProducts should sort all products of a given type in descending order by the quantity', function () {
        warehouse.addProduct('Drink', 'Cola', 2);
        warehouse.addProduct('Drink', 'Fanta', 3);
        warehouse.addProduct('Drink', 'Sprite', 1);
        warehouse.orderProducts('Drink');

        const expected = '{"Fanta":3,"Cola":2,"Sprite":1}';
        const actual = JSON.stringify(warehouse.availableProducts.Drink);

        assert.equal(actual, expected);
    });

    it('occupiedCapacity should return the already occupied place in the warehouse', function () {
        warehouse.addProduct('Drink', 'Cola', 2);
        warehouse.addProduct('Drink', 'Fanta', 3);
        warehouse.addProduct('Drink', 'Sprite', 1);

        const expected = 6;
        const actual = warehouse.occupiedCapacity();

        assert.equal(actual, expected);
    });

    it('revision should return the correct string when there are no products in the warehouse', function () {
        const expected = 'The warehouse is empty';
        const actual = warehouse.revision();

        assert.equal(actual, expected);
    });

    it('revision should return the correct string when there are no products in the warehouse', function () {
        warehouse.addProduct('Drink', 'Cola', 2);
        warehouse.addProduct('Food', 'Tomatoes', 5);

        const expected = 'Product type - [Food]\n- Tomatoes 5\nProduct type - [Drink]\n- Cola 2';
        const actual = warehouse.revision();

        assert.equal(actual, expected);
    });

    it('scrapeAProduct should return the correct string when the searched product does not exist', function () {
        assert.throws(() => warehouse.scrapeAProduct(undefined, 5), 'undefined do not exists');
    });

    it('scrapeAProduct should reduce products\' quantity when the product exists', function () {
        warehouse.addProduct('Drink', 'Sprite', 7);

        const expected = '{"Sprite":2}';
        const actual = JSON.stringify(warehouse.scrapeAProduct('Sprite', 5));

        assert.equal(actual, expected);
    });

    it('scrapeAProduct should reset products\' quantity when the product\'s quantity is less than the searched one', function () {
        warehouse.addProduct('Drink', 'Sprite', 3);

        const expected = '{"Sprite":0}';
        const actual = JSON.stringify(warehouse.scrapeAProduct('Sprite', 5));

        assert.equal(actual, expected);
    });
});