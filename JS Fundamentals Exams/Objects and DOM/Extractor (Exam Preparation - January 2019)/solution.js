function solve() {
    function extract() {
        const input = inputTextarea.value;

        const twoParts = splitText(input);
        const pattern = twoParts[0];
        let characters = twoParts[1];

        characters = removeUnnecessarySymbols(pattern, characters);
        characters = replaceHash(characters);
        outputTextarea.value = characters;
    }

    function splitText(input) {
        let array = input.split('');
        const charactersCount = getNumber(array);
        let characters = getCharacters(array, charactersCount);
        const lastChar = getLastChar(characters);
        const result = characters.join('').split(lastChar);
        return result;
    }

    function getNumber(array) {
        let numbers = [];

        for (let i = 0; i < array.length; i++) {
            if (isNaN(array[i])) {
                break;
            }

            numbers.push(array[i]);
        }

        for (let i = 0; i < numbers.length; i++) {
            array.shift();
        }

        return parseInt(numbers.join(''));
    }

    function getCharacters(array, charactersCount) {
        let tempArr = [];

        for (let i = 0; i < array.length && i < charactersCount; i++) {
            tempArr.push(array[i]);
        }

        return tempArr;
    }

    function getLastChar(characters) {
        let lastChar = characters.pop();
        return lastChar;
    }

    function removeUnnecessarySymbols(pattern, characters) {
        pattern = `[${pattern}]`;
        const result = characters.replace(new RegExp(pattern, 'g'), '');
        return result;
    }

    function replaceHash(characters) {
        const result = characters.replace(/#/g, ' ');
        return result;
    }

    const inputTextarea = document.getElementById('input');
    let outputTextarea = document.getElementById('output');

    const extractButton = document.getElementsByTagName('button')[0];
    extractButton.addEventListener('click', extract)
}
