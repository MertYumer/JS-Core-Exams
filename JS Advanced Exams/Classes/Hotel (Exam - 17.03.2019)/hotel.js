class Hotel {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;
        this.rooms = {
            single: Math.floor(this.capacity / 2),
            double: Math.floor(this.capacity * 0.3),
            maisonette: Math.floor(this.capacity * 0.2)
        };
    }

    get roomsPricing() {
        return {
            single: 50,
            double: 90,
            maisonette: 135
        }
    }

    get servicesPricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25
        }
    }

    rentARoom(clientName, roomType, nights) {
        if (this.rooms[roomType] > 0) {
            const booking = {
                clientName,
                roomType,
                nights,
                roomNumber: this.currentBookingNumber
            };

            this.bookings.push(booking);
            this.currentBookingNumber++;
            this.rooms[roomType]--;

            return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${booking.roomNumber}.`;
        }

        let output = `No ${roomType} rooms available!\n`;

        for (const type in this.rooms) {
            output += `Available ${type} rooms: ${this.rooms[type]}.\n`;
        }

        return output.trim();
    }

    roomService(currentBookingNumber, serviceType) {
        let bookingIndex = this.bookings
            .findIndex(b => b.roomNumber === currentBookingNumber);

        if (bookingIndex === -1) {
            return `The booking ${currentBookingNumber} is invalid.`;
        }

        if (!this.servicesPricing.hasOwnProperty(serviceType)) {
            return `We do not offer ${serviceType} service.`;
        }

        let booking = this.bookings[bookingIndex];
        
        if (!booking.hasOwnProperty('services')) {
            booking['services'] = [];
        }

        booking['services'].push(serviceType);

        return `Mr./Mrs. ${booking.clientName}, Your order for ${serviceType} service has been successful.`;
    }
}