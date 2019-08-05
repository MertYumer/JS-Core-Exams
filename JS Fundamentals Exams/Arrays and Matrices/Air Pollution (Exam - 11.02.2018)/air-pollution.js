function solve(matrix, commands) {
    function dropByRowIndex(index) {
        matrix[index] = matrix[index].map(block => Math.max(0, block - 15));
    }

    function dropByColumnIndex(index) {
        matrix.forEach(row => row[index] = Math.max(0, row[index] - 20));
    }

    function increaseAll(value) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                matrix[row][col] += value;
            }
        }
    }

    const pollutedAreas = [];

    for (let row = 0; row < 5; row++) {
        matrix[row] = matrix[row]
            .split(' ')
            .map(Number);
    }

    for (const input of commands) {
        const args = input.split(' ');
        const command = args[0];
        const number = +args[1];

        switch (command) {
            case 'breeze':
                dropByRowIndex(number);
                break;

            case 'gale':
                dropByColumnIndex(number);
                break;

            case 'smog':
                increaseAll(number);
                break;
        }
    }

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] >= 50) {
                pollutedAreas.push(`[${row}-${col}]`);
            }
        }
    }

    if (pollutedAreas.length > 0) {
        console.log(`Polluted areas: ${pollutedAreas.join(', ')}`);
    } else {
        console.log('No polluted areas');
    }
}
