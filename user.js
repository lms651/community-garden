import { MyPlant } from "./myPlant.js";
class User {
    constructor(name, username, email, street, city, state, zip, country, password) {
        this.id = User.nextId++;
        User.saveNextId(User.nextId); // Save the updated ID
        this.username = username;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.password = password;
        this.gardenMap = new Map(); // empty garden
    }
    static loadNextId() {
        const stored = localStorage.getItem("userNextId");
        return stored ? parseInt(stored) : 1;
    }
    static saveNextId(id) {
        localStorage.setItem("userNextId", id.toString());
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
    // static fromJson(obj: any): User {
    //   const user = new User(
    //     obj.name,
    //     obj.username,
    //     obj.email,
    //     obj.street,
    //     obj.city,
    //     obj.state,
    //     obj.zip,
    //     obj.country,
    //     obj.password
    //   );
    //   if (obj.garden) {
    //     // Convert garden array back to Map with MyPlant instances
    //     user.gardenMap = new Map(
    //       obj.garden.map(([key, value]: [string, any]) => [key, MyPlant.fromJson(value)])
    //     );
    //   }
    //   return user;
    // }
    static fromJson(obj) {
        const user = new User(obj.name, obj.username, obj.email, obj.street, obj.city, obj.state, obj.zip, obj.country, obj.password);
        user.id = obj.id; // VERY important!
        if (obj.garden) {
            user.gardenMap = new Map(obj.garden.map(([key, value]) => [key, MyPlant.fromJson(value)]));
        }
        return user;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
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
User.nextId = User.loadNextId();
export { User };
