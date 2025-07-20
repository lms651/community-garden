import { MyPlant } from "./myPlant";

class User {
    static nextId = User.loadNextId();
    id: number;
    name: string;
    username: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    password: string;
    gardenMap: Map<string, MyPlant>;
    garden: Record<string, MyPlant> = {};


  constructor(name: string, username: string, email: string, street: string, city: string, state: string,  zip: string, country: string, password: string) {
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

    static loadNextId(): number {
        const stored = localStorage.getItem("userNextId");
        return stored ? parseInt(stored) : 1;
    }

    static saveNextId(id: number): void {
        localStorage.setItem("userNextId", id.toString());
    }

    // Convert garden map to object for saving to localstorage
    mapToObj(map: Map<string, MyPlant>): Record<string, MyPlant> {
    return Object.fromEntries(map);
    }

    // Convert object to garden map for loading
    objToMap(obj: Record<string, MyPlant>): Map<string, MyPlant> {
    return new Map(Object.entries(obj));
    }

}

export {
    User
}
