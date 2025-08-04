class Trade {
    date: string; 
    fromUser: string; // these are currentUser.username or otherUser.username
    toUser: string;   
    offeredPlant: string;  // from currentUser dropdown input
    requestedPlant: string; // neighborPlantTitle
    status: "pending" | "accepted" | "rejected" | "completed" | "canceled" | "archived";
    messages: { from: string; text: string }[]; // holds messages about accepted trades

  constructor(
    fromUser: string,
    toUser: string,
    offeredPlant: string,
    requestedPlant: string,
    status: "pending" | "accepted" | "rejected" | "completed" | "canceled" | "archived",
    messages: { from: string; text: string }[] = [] 
  )
  {
    this.date = new Date().toLocaleString();
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.offeredPlant = offeredPlant;
    this.requestedPlant = requestedPlant;
    this.status = status;
    this.messages = messages;
  }

  getFormattedDate(): string {
    return new Date(this.date).toLocaleDateString();
  }

  toJSON(): object {
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

  static fromJSON(data: any): Trade {
    const trade = new Trade(
      data.fromUser,
      data.toUser,
      data.offeredPlant,
      data.requestedPlant,
      data.status,
      data.messages ?? [] // default to empty
    );
    trade.date = data.date;
    return trade;
  }
}

export {
  Trade
}