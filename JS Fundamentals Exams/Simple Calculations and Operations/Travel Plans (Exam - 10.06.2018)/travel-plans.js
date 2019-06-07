function solve(offers) {
    const specializedProfessions = ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing'];
    const averageProfessions = ['Driving', 'Managing', 'Fishing', 'Gardening'];
    const clumsyProfessions = ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting',
        'Writing', 'Lecturing', 'Modeling', 'Nursing'];

    let specializedCounter = 0;
    let clumsyCounter = 0;
    let totalGold = 0;

    for (const offer of offers) {
        const args = offer.split(' : ');
        const profession = args[0];
        const gold = +args[1];

        if (specializedProfessions.includes(profession)) {
            if (gold >= 200) {
                specializedCounter++;
                totalGold += (gold * 0.8);

                if (specializedCounter % 2 === 0) {
                    totalGold += 200;
                }
            }

        } else if (averageProfessions.includes(profession)) {
            totalGold += gold;

        } else if (clumsyProfessions.includes(profession)) {
            clumsyCounter++;

            if (clumsyCounter % 2 === 0) {
                totalGold += (gold * 0.95);
            } else if (clumsyCounter % 3 === 0) {
                totalGold += (gold * 0.9);
            } else {
                totalGold += gold;
            }
        }
    }

    console.log(`Final sum: ${totalGold.toFixed(2)}`);

    if (totalGold < 1000) {
        console.log(`Mariyka need to earn ${(1000 - totalGold).toFixed(2)} gold more to continue in the next task.`);
    } else {
        console.log(`Mariyka earned ${(totalGold - 1000).toFixed(2)} gold more.`);
    }
}
