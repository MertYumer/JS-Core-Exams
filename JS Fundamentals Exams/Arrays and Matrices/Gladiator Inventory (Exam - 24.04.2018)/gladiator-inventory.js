function solve(input) {
    function buy(equipment) {
        if (!inventory.includes(equipment)) {
            inventory.push(equipment);
        }
    }

    function trash(equipment) {
        const equipmentIndex = inventory.findIndex(e => e === equipment);

        if (equipmentIndex !== -1) {
            inventory.splice(equipmentIndex, 1);
        }
    }

    function repair(equipment) {
        const equipmentIndex = inventory.findIndex(e => e === equipment);

        if (equipmentIndex !== -1) {
            const equipment = inventory.splice(equipmentIndex, 1);
            inventory.push(equipment);
        }
    }

    function upgradeEquipment(equipment, upgrade) {
        const equipmentIndex = inventory.findIndex(e => e === equipment);

        if (equipmentIndex !== -1) {
            const upgradedEquipment = `${equipment}:${upgrade}`;
            inventory.splice(equipmentIndex + 1, 0, upgradedEquipment);
        }
    }

    let inventory = input.shift().split(' ');

    for (const pair of input) {
        const args = pair.split(/[ -]/);
        const command = args[0];
        const equipment = args[1];

        switch (command) {
            case 'Buy':
                buy(equipment);
                break;

            case 'Trash':
                trash(equipment);
                break;

            case 'Repair':
                repair(equipment);
                break;

            case 'Upgrade':
                const upgrade = args[2];
                upgradeEquipment(equipment, upgrade);
                break;

            case 'Fight!':
                console.log(inventory.join(' '));
                return;
        }
    }
}
