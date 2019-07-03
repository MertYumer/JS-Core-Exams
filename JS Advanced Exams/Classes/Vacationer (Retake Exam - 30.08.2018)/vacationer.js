class Vacationer {
    constructor(fullName, creditCard = [1111, "", 111]) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();

        this.creditCard = {
            cardNumber : 1111,
            expirationDate : "",
            securityNumber : 111
        };

        if(creditCard !== undefined) {
            this.addCreditCardInfo(creditCard);
        }

        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(fullName) {
        if (fullName.length !== 3) {
            throw Error('Name must include first name, middle name and last name');
        }

        const name = `${fullName[0]} ${fullName[1]} ${fullName[2]}`;
        const pattern = /^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/;

        if (!pattern.test(name)) {
            throw new Error('Invalid full name');
        }

        this._fullName = {
            firstName: fullName[0],
            middleName: fullName[1],
            lastName: fullName[2]
        };
    }

    generateIDNumber() {
        let id = 231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length;
        const LastCharOfLastName = this.fullName.lastName[this.fullName.lastName.length - 1];

        switch (LastCharOfLastName) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                id += '8';
                break;

            default:
                id += '7';
        }

        return id;
    }

    addCreditCardInfo(input) {
        if (input.length < 3) {
            throw Error('Missing credit card information');
        }

        if (typeof input[0] !== 'number' || typeof input[2] !== 'number') {
            throw Error('Invalid credit card details');
        }

        this.creditCard.cardNumber = +input[0];
        this.creditCard.expirationDate = input[1];
        this.creditCard.securityNumber = +input[2];
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw Error('Destination already exists in wishList');
        }

        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        let vacationerInfo = [];
        vacationerInfo.push(`Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}`);
        vacationerInfo.push(`ID Number: ${this.idNumber}`);

        vacationerInfo.push('Wishlist:');
        const destinations = this.wishList.length > 0 ? this.wishList.join(', ') : 'empty';
        vacationerInfo.push(destinations);

        vacationerInfo.push('Credit Card:');
        vacationerInfo.push(`Card Number: ${this.creditCard.cardNumber}`);
        vacationerInfo.push(`Expiration Date: ${this.creditCard.expirationDate}`);
        vacationerInfo.push(`Security Number: ${this.creditCard.securityNumber}`);

        return vacationerInfo.join('\n');
    }
}
