import { MyPlant } from "../garden/myPlant.js";
class User {
    constructor(id, username, email, street, city, state, zip, country, password) {
        this.username = username;
        this.id = id;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.password = password;
        this.gardenMap = new Map(); // empty garden
    }
    static getNextId() {
        const stored = localStorage.getItem("userNextId");
        return stored ? parseInt(stored) + 1 : 1;
    }
    static saveNextId(id) {
        localStorage.setItem("userNextId", id.toString());
    }
    getFullAddress() {
        return `${this.street}, ${this.city}, ${this.state}, ${this.zip} ${this.country}`;
    }
    // Convert garden map to object for saving to localstorage
    mapToObj(map) {
        return Object.fromEntries(map);
    }
    objToMap(obj) {
        if (!obj)
            return new Map(); // Return empty map if null/undefined
        return new Map(Object.entries(obj));
    }
    static fromJson(obj) {
        const user = new User(obj.id, obj.username, obj.email, obj.street, obj.city, obj.state, obj.zip, obj.country, obj.password);
        if (obj.garden) {
            user.gardenMap = new Map(obj.garden.map(([key, value]) => [key, MyPlant.fromJson(value)]));
        }
        return user;
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
        };
    }
}
export { User };
