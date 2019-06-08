function solve() {
    function filter(currentButton, input) {
        const filterCommand = currentButton.parentNode.querySelector('#filterSecondaryCmd').value;
        const position = +currentButton.parentNode.querySelector("#filterPosition").value;
        let char = '';

        switch (filterCommand) {
            case 'uppercase':
                char = input.filter(c => c === c.toUpperCase() && isNaN(c))[position - 1];
                output.textContent += char;
                break;

            case 'lowercase':
                char = input.filter(c => c === c.toLowerCase() && isNaN(c))[position - 1];
                output.textContent += char;
                break;

            case 'nums':
                char = input.filter(c => !isNaN(c))[position - 1];
                output.textContent += char;
                break;
        }
    }

    function sort(currentButton, input) {
        const sortCommand = currentButton.parentNode.querySelector('#sortSecondaryCmd').value;
        const position = +currentButton.parentNode.querySelector("#sortPosition").value;
        let char = '';

        switch (sortCommand) {
            case 'A':
                char = input.sort((a, b) => a.localeCompare(b))[position - 1];
                output.textContent += char;
                break;

            case 'Z':
                char = input.sort((a, b) => b.localeCompare(a))[position - 1];
                output.textContent += char;
                break;
        }
    }

    function rotate(currentButton, input) {
        const rotations = +currentButton.parentNode.querySelector('#rotateSecondaryCmd').value;
        const position = +currentButton.parentNode.querySelector("#rotatePosition").value;

        for (let i = 0; i < rotations; i++) {
            let lastElement = input.pop();
            input.unshift(lastElement);
        }

        const char = input[position - 1];
        output.textContent += char;
    }

    function get(currentButton, input) {
        const position = +currentButton.parentNode.querySelector("#getPosition").value;
        const char = input[position - 1];
        output.textContent += char;
    }

    function clickEvent(e) {
        const currentButton = e.target;
        let inputElement = document.getElementById('input');
        let input = inputElement.value.split('');
        inputElement.value = '';

        switch (currentButton.textContent) {
            case 'Filter':
                filter(currentButton, input);
                break;

            case 'Sort':
                sort(currentButton, input);
                break;

            case 'Rotate':
                rotate(currentButton, input);
                break;

            case 'Get':
                get(currentButton, input);
                break;
        }
    }

    const buttons = document.getElementsByTagName('button');
    let output = document.querySelector('#output p');

    for (const button of buttons) {
        button.addEventListener('click', clickEvent);
    }
}