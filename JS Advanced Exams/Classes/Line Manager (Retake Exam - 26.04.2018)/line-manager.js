class LineManager {
    constructor(stops) {
        this.stops = stops;
        this.currentStopIndex = 0;
        this.lastStopIndex = this._stops.length - 1;
        this.delay = 0;
        this.duration = 0;
    }

    set stops(stops) {
        if (stops.some(s =>
            typeof s.name !== 'string' || s.name === '' ||
            typeof s.timeToNext !== 'number' || s.timeToNext < 0)) {
            throw new Error('Invalid stop');
        }

        this._stops = stops;
    }

    get atDepot() {
        return this.currentStopIndex === this.lastStopIndex;
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot.';
        }

        const nextStopIndex = this.currentStopIndex + 1;
        return this._stops[nextStopIndex].name;
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if (minutes < 0) {
            throw new Error('Minutes cannot be negative');
        }

        if (this.atDepot) {
            throw new Error('Bus is at depot');
        }

        this.duration += minutes;
        this.delay += minutes - this._stops[this.currentStopIndex].timeToNext;
        this.currentStopIndex++;

        return this.atDepot ? false : true;
    }

    toString() {
        const info = [];
        info.push('Line summary');

        if (this.currentStopIndex < this.lastStopIndex) {
            info.push(`- Next stop: ${this.nextStopName}`);
        } else {
            info.push(`- Course completed`);
        }

        info.push(`- Stops covered: ${this.currentStopIndex}`);
        info.push(`- Time on course: ${this.duration} minutes`);
        info.push(`- Delay: ${this.delay} minutes`);

        return info.join('\n');
    }
}
