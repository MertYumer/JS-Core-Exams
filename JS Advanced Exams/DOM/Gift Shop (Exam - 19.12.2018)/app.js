function solution() {
    const giftShop = document.getElementById('christmasGiftShop');

    const addButton = document.getElementsByTagName('button')[0];
    addButton.addEventListener('click', addToy);

    function addToy() {
        const toyTypeInput = document.getElementById('toyType');
        const toyType = toyTypeInput.value;

        const toyPriceInput = document.getElementById('toyPrice');
        const toyPrice = toyPriceInput.value;

        const toyDescriptionInput = document.getElementById('toyDescription');
        const toyDescription = toyDescriptionInput.value;

        if (toyType && !isNaN(toyPrice) && toyDescription.length > 0 && toyDescription.length <= 50) {
            const div = document.createElement('div');
            div.className = 'gift';

            const img = document.createElement('img');
            img.src = 'gift.png';
            div.appendChild(img);

            const h2 = document.createElement('h2');
            h2.textContent = toyType;
            div.appendChild(h2);

            const p = document.createElement('p');
            p.textContent = toyDescription;
            div.appendChild(p);

            const buyButton = document.createElement('button');
            buyButton.textContent = `Buy it for $${toyPrice}`;
            buyButton.addEventListener('click', (e) => {
                e.target.parentNode.remove();
            });

            div.appendChild(buyButton);

            document.getElementById('christmasGiftShop').appendChild(div);
        }

        toyTypeInput.value = '';
        toyPriceInput.value = '';
        toyDescriptionInput.value = '';
    }
}

