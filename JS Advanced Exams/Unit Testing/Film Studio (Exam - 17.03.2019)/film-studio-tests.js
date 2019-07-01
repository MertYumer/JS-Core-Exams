const FilmStudio = require('./film-studio');
const assert = require('chai').assert;

describe('FilmStudio Tests', function () {
    let filmStudio;

    beforeEach(function () {
        filmStudio = new FilmStudio('SU-Studio');
    });

    it('constructor should set name property correctly', function () {
        const expected = 'SU-Studio';
        const actual = filmStudio.name;

        assert.equal(actual, expected);
    });

    it('constructor should initialize films property az empty array', function () {
        const expected = 0;
        const actual = filmStudio.films.length;

        assert.equal(actual, expected);
    });

    it('makeMovie function should throw error when arguments\' count is different than 2', function () {
        assert.throw(() => {
            filmStudio.makeMovie('The Avengers')
        }, 'Invalid arguments count');
    });

    it('makeMovie function should throw error when arguments\' types are invalid', function () {
        assert.throw(() => {
            filmStudio.makeMovie(true, 2)
        }, 'Invalid arguments');
    });

    it('makeMovie function should return the correct object when arguments are valid', function () {
        const expected = {
            filmName: 'The Avengers',
            filmRoles: [
                {role: 'Iron-Man', actor: false},
                {role: 'Thor', actor: false},
                {role: 'Hulk', actor: false},
                {role: 'Arrow guy', actor: false}]
        };

        const actual = filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);

        assert.equal(actual.toString(), expected.toString());
    });

    it('makeMovie function should make sequel if film\'s name exists', function () {
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);

        const expected = 'The Avengers 2';
        const actual = filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']).filmName;

        assert.equal(actual, expected);
    });

    it('casting function should return the correct string when there are no films', function () {
        const expected = 'There are no films yet in SU-Studio.';
        const actual = filmStudio.casting('Johnny Depp', 'Iron-Man');

        assert.equal(actual, expected);
    });

    it('casting function should return the correct string when the searched role is not found', function () {
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);

        const expected = 'Johnny Depp, we cannot find a Jack Sparrow role...';
        const actual = filmStudio.casting('Johnny Depp', 'Jack Sparrow');

        assert.equal(actual, expected);
    });

    it('casting function should return the correct string when the searched role is found', function () {
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);

        const expected = 'You got the job! Mr. Johnny Depp you are next Iron-Man in the The Avengers. Congratz!';
        const actual = filmStudio.casting('Johnny Depp', 'Iron-Man');

        assert.equal(actual, expected);
    });

    it('casting function should set the actor for the role correctly', function () {
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
        filmStudio.casting('Johnny Depp', 'Iron-Man');
        const film = filmStudio.films[0];

        const expected = film.filmRoles[0].actor;
        const actual = 'Johnny Depp';

        assert.equal(actual, expected);
    });

    it('lookForProducer function should throw error when the searched film is not found', function () {
        assert.throw(() => {
            filmStudio.lookForProducer('The Avengers')
        }, 'The Avengers do not exist yet, but we need the money...');
    });

    it('lookForProducer function should return film\'s info correctly when the film exists', function () {
        filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor']);
        filmStudio.casting('Johnny Depp', 'Iron-Man');
        filmStudio.casting('Kit Harington', 'Thor');

        let expected = 'Film name: The Avengers\n';
        expected += 'Cast:\n';
        expected += 'Johnny Depp as Iron-Man\n';
        expected += 'Kit Harington as Thor\n';

        const actual = filmStudio.lookForProducer('The Avengers');

        assert.equal(actual, expected);
    });
});