import { MyPlant } from "../garden/myPlant.js";
import { Trade } from "../trade_logic/Trade.js";
import { loadTrades, removeTrade } from "../trade_logic/trades.js";
class User {
    constructor(id, username, email, street, city, state, zip, country, password) {
        this.archivedTrades = [];
        this.id = id;
        this.username = username;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.password = password;
        this.gardenMap = new Map();
        this.archivedTrades = [];
    }
    static getNextId() {
        const usersRaw = localStorage.getItem("users");
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        return users.length + 1;
    }
    // For Geocoding
    getFullAddress() {
        return `${this.street}, ${this.city}, ${this.state}, ${this.zip} ${this.country}`;
    }
    static fromJson(obj) {
        const user = new User(obj.id, obj.username, obj.email, obj.street, obj.city, obj.state, obj.zip, obj.country, obj.password);
        if (obj.garden) {
            user.gardenMap = new Map(obj.garden.map(([key, value]) => [key, MyPlant.fromJson(value)]));
        }
        if (obj.archivedTrades) {
            user.archivedTrades = obj.archivedTrades.map((t) => Trade.fromJSON(t));
        }
        else {
            user.archivedTrades = [];
        }
        return user;
    }
    archiveTrade(trade) {
        const allTrades = loadTrades();
        removeTrade(trade, allTrades);
        trade.status = "archived";
        this.archivedTrades.push(trade);
    }
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            street: this.street,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country,
            password: this.password,
            garden: Array.from(this.gardenMap.entries()).map(([key, plant]) => [key, plant.toJson()]),
            archivedTrades: this.archivedTrades.map(trade => trade.toJSON())
        };
    }
}
export { User };
