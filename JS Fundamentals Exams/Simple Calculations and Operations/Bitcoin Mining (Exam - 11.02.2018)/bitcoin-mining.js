function solve(days) {
    const bitcoinPrice = 11949.16;
    const goldPrice = 67.51;

    let boughtBitcoins = 0;
    let day = 0;
    let money = 0;

    for (let i = 0; i < days.length; i++) {
        let gold = days[i];

        if ((i + 1) % 3 === 0) {
            gold *= 0.7;
        }

        money += gold * goldPrice;

        if (money >= bitcoinPrice) {
            if (day === 0) {
                day = i + 1;
            }

            while(money >= bitcoinPrice) {
                money -= bitcoinPrice;
                boughtBitcoins++;
            }
        }
    }

    console.log(`Bought bitcoins: ${boughtBitcoins}`);

    if (boughtBitcoins > 0) {
        console.log(`Day of the first purchased bitcoin: ${day}`);
    }

    console.log(`Left money: ${money.toFixed(2)} lv.`);
}
