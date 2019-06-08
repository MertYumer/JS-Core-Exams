function solve(matrix, pairs) {
    function dropByRowIndex(row) {
        matrix[row] = matrix[row].map(n => Math.max(n - 15, 0));
    }

    function dropByColumnIndex(col) {
        for (let row = 0; row < 5; row++) {
            let currentNumber = matrix[row][col];
            matrix[row][col] = Math.max(currentNumber - 20, 0);
        }
    }

    function increaseAll(value) {
        matrix = matrix
            .map(r => r
                .map(n => n + value));
    }

    let pollutedAreas = [];

    for (let i = 0; i < 5; i++) {
        matrix[i] = matrix[i]
            .split(' ')
            .map(Number);
    }

    for (const pair of pairs) {
        const args = pair.split(' ');
        const command = args[0];
        const value = +args[1];

        switch (command) {
            case 'breeze':
                dropByRowIndex(value);
                break;

            case 'gale':
                dropByColumnIndex(value);
                break;

            case 'smog':
                increaseAll(value);
                break;
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] >= 50) {
                pollutedAreas.push(`[${i}-${j}]`);
            }
        }
    }

    const result = pollutedAreas.length > 0
        ? `Polluted areas: ${pollutedAreas.join(', ')}`
        : 'No polluted areas';

    console.log(result);
}
