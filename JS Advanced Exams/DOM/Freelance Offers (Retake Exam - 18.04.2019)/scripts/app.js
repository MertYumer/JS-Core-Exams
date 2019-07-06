function solve() {
    const createOfferDiv = document.getElementById('create-offers');
    createOfferDiv.style.display = 'none';

    const username = document.getElementById('username');
    const notification = document.getElementById('notification');

    const loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', login);

    function login(e) {
        e.preventDefault();

        if (loginButton.textContent === 'Logout') {
            createOfferDiv.style.display = 'none';
            username.removeAttribute('disabled');
            username.className = username.className.replace(' border-0 bg-light', '');
            loginButton.textContent = 'Login';
            username.value = '';
            notification.textContent = '';

        } else if (loginButton.textContent === 'Login') {
            if (username.value.length >= 4 && username.value.length <= 10) {
                createOfferDiv.style.display = 'block';
                username.value = `Hello, ${username.value}!`;
                username.disabled = true;
                username.className += ' border-0 bg-light';
                loginButton.textContent = 'Logout';
                notification.textContent = '';
            } else {
                notification.textContent = 'The username length should be between 4 and 10 characters.';
            }
        }
    }

    const offerName = document.getElementById('offerName');
    const company = document.getElementById('company');
    const description = document.getElementById('description');
    const createOfferButton = document.getElementById('create-offer-Btn');
    createOfferButton.addEventListener('click', createOffer);

    function createOffer(e) {
        e.preventDefault();
        if (offerName.value && company.value && description.value) {

            const offer = document.createElement('div');
            offer.classList.add('col-3');

            const card = document.createElement('div');
            card.className += 'card text-white bg-dark mb-3 pb-3';
            card.style.maxWidth = '18rem';

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.textContent = offerName.value;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = company.value;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = description.value;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            offer.appendChild(card);

            const offers = document.getElementById('offers-container');
            offers.appendChild(offer);
        }

        offerName.value = '';
        company.value = '';
        description.value = '';
    }
}

solve();
