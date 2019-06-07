function solve(array) {
    function addPart(model, part, serialNumber) {
        if (!parts[model]) {
            parts[model] = {};
        }

        if (!parts[model][part]) {
            parts[model][part] = [];
        }

        parts[model][part].push(serialNumber);
    }

    function repair(model, carSpecifications) {
        if (!instructions.includes(model)) {
            console.log(`${model} is not supported`);

        } else {
            for (const part in carSpecifications) {
                if (carSpecifications[part] === "broken") {
                    if (parts[model] && parts[model][part]) {
                        carSpecifications[part] = parts[model][part].shift();
                    }
                }
            }

            console.log(`${model} client - ${JSON.stringify(carSpecifications)}`);
        }
    }

    let instructions = [];
    let parts = {};

    for (const input of array) {
        const args = input.split(' ');
        const command = args[0];
        const model = args[1];

        switch (command) {
            case 'instructions':
                instructions.push(model);
                break;

            case 'addPart':
                const part = args[2];
                const serialNumber = args[3];
                addPart(model, part, serialNumber);
                break;

            case 'repair':
                const carSpecifications = JSON.parse(args[2]);
                repair(model, carSpecifications);
                break;
        }
    }

    const sortedModels = Object.keys(parts).sort((a, b) => a.localeCompare(b));

    for (const model of sortedModels) {
        console.log(`${model} - ${JSON.stringify(parts[model])}`);
    }
}
