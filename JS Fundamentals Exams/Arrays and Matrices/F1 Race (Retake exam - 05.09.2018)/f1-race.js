function solve(input) {
    function join(pilot) {
        if (!pilots.includes(pilot)) {
            pilots.push(pilot);
        }
    }

    function crash(pilot) {
        const pilotIndex = pilots.indexOf(pilot);

        if (pilotIndex !== -1) {
            pilots.splice(pilotIndex, 1);
        }
    }

    function pitstop(pilot) {
        const pilotIndex = pilots.indexOf(pilot);

        if (pilotIndex !== -1 && pilotIndex < pilots.length - 1) {
            [pilots[pilotIndex], pilots[pilotIndex + 1]] = [pilots[pilotIndex + 1], pilots[pilotIndex]];
        }
    }

    function overtake(pilot) {
        const pilotIndex = pilots.indexOf(pilot);

        if (pilotIndex > 0) {
            [pilots[pilotIndex], pilots[pilotIndex - 1]] = [pilots[pilotIndex - 1], pilots[pilotIndex]];
        }
    }

    let pilots = input.shift().split(' ');

    for (const pair of input) {
        const args = pair.split(' ');
        const command = args[0];
        const pilot = args[1];

        switch (command) {
            case 'Join':
                join(pilot);
                break;

            case 'Crash':
                crash(pilot);
                break;

            case 'Pit':
                pitstop(pilot);
                break;

            case 'Overtake':
                overtake(pilot);
                break;
        }
    }

    console.log(pilots.join(' ~ '));
}
