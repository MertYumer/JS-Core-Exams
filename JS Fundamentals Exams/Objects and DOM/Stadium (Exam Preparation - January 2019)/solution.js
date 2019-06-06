function solve() {
    function markSeat(price, zone, sector, button) {
        const seatNumber = +button.textContent;
        let outputTextarea = document.getElementById('output');

        if (!button.hasAttribute('style')) {
            button.style.backgroundColor = 'rgb(255,0,0)';
            profit += price;
            fansCount++;

            outputTextarea.value += ` Seat ${seatNumber} in zone ${zone} sector ${sector} was taken.\n`;
        } else {
            outputTextarea.value += ` Seat ${seatNumber} in zone ${zone} sector ${sector} is unavailable.\n`;
        }
    }

    function getSummary() {
        summarySpan.textContent = `${profit} leva, ${fansCount} fans.`;
    }

    let profit = 0;
    let fansCount = 0;
    const sectors = ['A', 'B', 'C'];

    const prices = {
        'A': function (zone) {
            return zone === 'VIP' ? 25 : 10;
        },
        'B': function (zone) {
            return zone === 'VIP' ? 15 : 7;
        },
        'C': function (zone) {
            return zone === 'VIP' ? 10 : 5;
        },
    };

    const sections = document.getElementsByTagName('section');

    for (const section of sections) {
        const zone = section.className;
        const rows = section.querySelectorAll('table tbody tr');

        for (const row of rows) {
            const td = row.querySelectorAll('td');

            for (let i = 0; i < 3; i++) {
                const sector = sectors[i];
                const price = prices[sector](zone);

                const button = td[i].querySelector('button');

                button.addEventListener('click', function () {
                    markSeat(price, zone, sector, button);
                });
            }
        }
    }

    const summaryDiv = document.getElementById('summary');
    const summaryButton = summaryDiv.querySelector('button');
    const summarySpan = summaryDiv.querySelector('span');

    summaryButton.addEventListener('click', getSummary);
}