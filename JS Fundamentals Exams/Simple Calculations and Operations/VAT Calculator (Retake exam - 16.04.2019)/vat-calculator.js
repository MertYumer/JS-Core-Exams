function solve(priceWithVAT, vatRate) {
    const priceWithoutVAT = priceWithVAT / (vatRate / 100 + 1);
    console.log(priceWithoutVAT.toFixed(2));
}
