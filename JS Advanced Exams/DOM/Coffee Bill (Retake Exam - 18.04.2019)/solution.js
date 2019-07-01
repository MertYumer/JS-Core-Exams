function addProduct() {
    const productElement = document.getElementsByTagName('input')[0];
    const priceElement = document.getElementsByTagName('input')[1];

    if (productElement.value && priceElement.value) {
        if (+priceElement.value > 0) {
            const tbodyElement = document.getElementById('product-list');
            const trElement = document.createElement('tr');

            const tdProductElement = document.createElement('td');
            tdProductElement.textContent = productElement.value;
            trElement.appendChild(tdProductElement);

            const tdPriceElement = document.createElement('td');
            tdPriceElement.textContent = priceElement.value;
            trElement.appendChild(tdPriceElement);

            tbodyElement.appendChild(trElement);

            const totalPriceElement = document.querySelector("#bill > tfoot > tr > td:nth-child(2)");
            totalPriceElement.textContent = +totalPriceElement.textContent + +priceElement.value;
        }
    }

    productElement.value = '';
    priceElement.value = '';
}