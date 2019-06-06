function solve(firstMatrix, secondMatrix) {
    let resultMatrix = [];

    for (let row = 0; row < firstMatrix.length; row++) {
        resultMatrix[row] = [];

        for (let col = 0; col < firstMatrix[row].length; col++) {
            let sum = firstMatrix[row][col] + secondMatrix[row][col];
            resultMatrix[row][col] = sum;
        }
    }

    for (let row = 0; row < resultMatrix.length; row++) {
        for (let col = 0; col < resultMatrix[row].length; col++) {
            if (resultMatrix[row][col] > 9 && col < resultMatrix[row].length - 1) {
                const remainder = resultMatrix[row][col] - 9;
                resultMatrix[row][col] = 9;
                resultMatrix[row][col + 1] += remainder;

            } else if (resultMatrix[row][col] > 9 && col === resultMatrix[row].length - 1) {
                const remainder = resultMatrix[row][col] - 9;
                resultMatrix[row][col] = 9;
                resultMatrix[row][col + 1] = remainder;
            }
        }
    }

    console.log(JSON.stringify(resultMatrix));
}
