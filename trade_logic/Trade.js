class Trade {
    constructor(fromUser, toUser, offeredPlant, requestedPlant, status, messages = []) {
        this.date = new Date().toLocaleString();
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.offeredPlant = offeredPlant;
        this.requestedPlant = requestedPlant;
        this.status = status;
        this.messages = messages;
    }
    getFormattedDate() {
        return new Date(this.date).toLocaleDateString();
    }
    toJSON() {
        return {
            date: this.date,
            fromUser: this.fromUser,
            toUser: this.toUser,
            offeredPlant: this.offeredPlant,
            requestedPlant: this.requestedPlant,
            status: this.status,
            messages: this.messages
        };
    }
    static fromJSON(data) {
        var _a;
        const trade = new Trade(data.fromUser, data.toUser, data.offeredPlant, data.requestedPlant, data.status, (_a = data.messages) !== null && _a !== void 0 ? _a : [] // default to empty
        );
        trade.date = data.date;
        return trade;
    }
}
export { Trade };
