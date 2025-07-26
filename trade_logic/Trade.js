class Trade {
    constructor(fromUser, toUser, offeredPlant, requestedPlant, status) {
        this.date = new Date().toLocaleString();
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.offeredPlant = offeredPlant;
        this.requestedPlant = requestedPlant;
        this.status = status;
    }
    getFormattedDate() {
        return new Date(this.date).toLocaleDateString();
    }
    toJSON() {
        // To support JSON.stringify
        return {
            date: this.date,
            fromUser: this.fromUser,
            toUser: this.toUser,
            offeredPlant: this.offeredPlant,
            requestedPlant: this.requestedPlant,
            status: this.status
        };
    }
    static fromJSON(data) {
        const trade = new Trade(data.fromUser, data.toUser, data.offeredPlant, data.requestedPlant, data.status);
        trade.date = data.date;
        return trade;
    }
}
export { Trade };
