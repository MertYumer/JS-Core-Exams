function solve(input) {
    const bitcoinPrice = 11949.16;
    const oneGramOfGoldPrice = 67.51;
    let dayOfFirstPurchasedBitcoin = 0;
    let bitcoins = 0;
    let money = 0;

    for (let i = 0; i < input.length; i++) {
        let goldInGrams = +input[i];

        if ((i + 1) % 3 === 0) {
            goldInGrams *= 0.7;
        }

        money += (goldInGrams * oneGramOfGoldPrice);

        if (money >= bitcoinPrice) {
            if (dayOfFirstPurchasedBitcoin === 0) {
                dayOfFirstPurchasedBitcoin = i + 1;
            }

            while (money >= bitcoinPrice) {
                money -= bitcoinPrice;
                bitcoins++
            }
        }
    }

    console.log(`Bought bitcoins: ${bitcoins}`);

    if (dayOfFirstPurchasedBitcoin > 0) {
        console.log(`Day of the first purchased bitcoin: ${dayOfFirstPurchasedBitcoin}`);
    }

    console.log(`Left money: ${money.toFixed(2)} lv.`);
}
