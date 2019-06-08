function solve(input) {
    let teams = {};
    
    for (const element of input) {
        const args = element.split(' -> ');

        const team = args[0];
        const pilot = args[1];
        const points = +args[2];

        if (!teams.hasOwnProperty(team)) {
            teams[team] = {
                pilots: {},
                totalPoints: 0
            };
        }

        if (!teams[team]['pilots'].hasOwnProperty(pilot)) {
            teams[team]['pilots'][pilot] = 0;
        }

        teams[team]['pilots'][pilot] += points;
        teams[team]['totalPoints'] += points;
    }

    const topThree = Object.entries(teams)
        .sort((a, b) => b[1].totalPoints - a[1].totalPoints)
        .slice(0, 3);
    
    for (const [team, members] of topThree) {
        console.log(`${team}: ${members.totalPoints}`);

        const sortedPilots = Object.entries(members.pilots).sort((a, b) => b[1] - a[1]);

        for (const [pilot, points] of sortedPilots) {
            console.log(`-- ${pilot} -> ${points}`);
        }
    }
}
