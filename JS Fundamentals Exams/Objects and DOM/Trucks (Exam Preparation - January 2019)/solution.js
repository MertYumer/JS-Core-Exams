function solve() {
    function addNewTruck() {
        const plateNumberInput = document.getElementById('newTruckPlateNumber');
        const plateNumber = plateNumberInput.value;
        plateNumberInput.value = '';

        const tiresConditionInput = document.getElementById('newTruckTiresCondition');
        const tiresCondition = tiresConditionInput
            .value
            .split(' ')
            .map(Number);

        tiresConditionInput.value = '';

        let truck = {
            plateNumber,
            tiresCondition,
            totalDistance: 0
        };

        const truckIndex = trucks.findIndex(t => t.plateNumber === truck.plateNumber);

        if (truckIndex === -1) {
            trucks.push(truck);

            let div = document.createElement("div");
            div.className = "truck";
            div.textContent = truck.plateNumber;
            trucksInfo.appendChild(div);
        }
    }

    function addNewTires() {
        const tiresConditionInput = document.getElementById('newTiresCondition');
        const tiresCondition = tiresConditionInput
            .value
            .split(' ')
            .map(Number);

        tiresConditionInput.value = '';

        backupTires.push(tiresCondition);
        let div = document.createElement("div");
        div.className = "tireSet";
        div.textContent = tiresCondition.join(' ');
        backupTiresSet.appendChild(div);
    }

    function changeTires(truck) {
        truck.tiresCondition = backupTires.shift();
        backupTiresSet.removeChild(backupTiresSet.children[1]);
    }

    function work() {
        const plateNumberInput = document.getElementById('workPlateNumber');
        const plateNumber = plateNumberInput.value;
        plateNumberInput.value = '';

        const distanceInput = document.getElementById('distance');
        const distance = +distanceInput.value;
        distanceInput.value = '';

        const qualityReduction = Math.floor(distance / 1000);
        let truck = trucks.find(t => t.plateNumber === plateNumber);

        if (truck) {
            let minQuality = Math.min(...truck.tiresCondition);

            if (minQuality >= qualityReduction) {
                truck.tiresCondition = truck.tiresCondition.map(t => t - qualityReduction);
                truck.totalDistance += distance;

            } else if (backupTires){
                changeTires(truck, plateNumber);
                minQuality = Math.min(...truck.tiresCondition);

                if (minQuality >= qualityReduction) {
                    truck.tiresCondition = truck.tiresCondition.map(t => t - qualityReduction);
                    truck.totalDistance += distance;
                }
            }
        }
    }

    function reportTrucks() {
        for (const truck of trucks) {
            report.textContent += `Truck ${truck.plateNumber} has traveled ${truck.totalDistance}.\n`;
        }

        report.textContent += `You have ${backupTires.length} sets of tires left.\n`;
    }

    function clickEvent(event) {
        const command = event.target;

        switch (command.textContent) {
            case 'Add new truck':
                addNewTruck();
                break;

            case 'Add new tires':
                addNewTires();
                break;

            case 'Go to work':
                work();
                break;

            case 'End of the shift':
                reportTrucks();
                break;
        }
    }

    let trucks = [];
    let backupTires = [];

    const buttons = document.querySelectorAll('button');
    let backupTiresSet = document.getElementsByTagName('fieldset')[3];
    backupTiresSet.removeChild(backupTiresSet.children[1]);
    let trucksInfo = document.getElementsByTagName('fieldset')[4];
    let report = document.querySelector('textarea');

    for (const button of buttons) {
        button.addEventListener('click', clickEvent);
    }
}