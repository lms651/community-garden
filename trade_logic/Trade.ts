class Trade {
    date: string; 
    fromUser: string; // currentUser.username
    toUser: string;   // neighborUser.username
    offeredPlant: string;  // from currentUser dropdown input
    requestedPlant: string; // neighborPlantTitle
    status: "pending" | "accepted" | "rejected" | "completed" | "canceled";

  constructor(
    fromUser: string,
    toUser: string,
    offeredPlant: string,
    requestedPlant: string,
    status: "pending" | "accepted" | "rejected" | "completed" | "canceled"
  )
  {
    this.date = new Date().toLocaleString();
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.offeredPlant = offeredPlant;
    this.requestedPlant = requestedPlant;
    this.status = status;
  }

  getFormattedDate(): string {
    return new Date(this.date).toLocaleDateString();
  }

  toJSON(): object {
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

  static fromJSON(data: any): Trade {
    const trade = new Trade(
      data.fromUser,
      data.toUser,
      data.offeredPlant,
      data.requestedPlant,
      data.status
    );
    trade.date = data.date;
    return trade;
  }
}

export {
  Trade
}