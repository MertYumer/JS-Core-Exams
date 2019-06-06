function solve(table, command) {
    function hide(header) {
        const headerIndex = table[0].indexOf(header);

        if (headerIndex !== -1) {
            for (let i = 0; i < table.length; i++) {
                table[i].splice(headerIndex, 1);
            }
        }
    }

    function sort(header) {
        const headerIndex = table[0].indexOf(header);
        const headerRow = table.shift();
        table.sort((a, b) => a[headerIndex].localeCompare(b[headerIndex]));
        table.unshift(headerRow);
    }

    function filter(header, value) {
        const headerIndex = table[0].indexOf(header);
        let tempTable = [];
        tempTable.push(table.shift());

        for (let i = 0; i < table.length; i++) {
            if (table[i][headerIndex] === value) {
                tempTable.push(table[i]);
            }
        }

        table = tempTable;
    }

    const input = command.split(' ');
    command = input[0];
    const header = input[1];

    switch (command) {
        case 'hide':
            hide(header);
            break;

        case 'sort':
            sort(header);
            break;

        case 'filter':
            const value = input[2];
            filter(header, value);
            break;
    }

    for (let i = 0; i < table.length; i++) {
        console.log(table[i].join(' | '));
    }
}

