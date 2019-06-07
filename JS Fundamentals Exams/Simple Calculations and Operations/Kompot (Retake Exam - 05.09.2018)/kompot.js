function solve(input) {
    let fruits = {
        'cherry': 0,
        'plum': 0,
        'peach': 0
    };

    let fruitsForRakiya = 0;

    for (const pair of input) {
        const args = pair.split(' ').filter(x => x);
        const fruit = args[0];
        const weight = +args[1];

        if (fruits.hasOwnProperty(fruit)) {
            fruits[fruit] += weight;

        } else {
            fruitsForRakiya += weight;
        }
    }

    const cherryCompots = Math.floor((fruits['cherry'] / 0.009) / 25);
    const peachCompots = Math.floor((fruits['peach'] / 0.14) / 2.5);
    const plumCompots = Math.floor((fruits['plum'] / 0.02) / 10);
    const rakiyaLiters = fruitsForRakiya * 0.2;

    console.log(`Cherry kompots: ${cherryCompots}`);
    console.log(`Peach kompots: ${peachCompots}`);
    console.log(`Plum kompots: ${plumCompots}`);
    console.log(`Rakiya liters: ${rakiyaLiters.toFixed(2)}`);
}
