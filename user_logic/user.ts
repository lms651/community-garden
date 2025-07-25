import { MyPlant } from "../garden/myPlant.js";

class User {
    id: number;
    username: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    password: string;
    gardenMap: Map<string, MyPlant>;

  constructor(id: number, username: string, email: string, street: string, city: string, state: string,  zip: string, country: string, password: string) {
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

  static getNextId(): number {
      const stored = localStorage.getItem("userNextId");
      return stored ? parseInt(stored) + 1 : 1;
  }

  static saveNextId(id: number): void {
      localStorage.setItem("userNextId", id.toString());
  }

    // Convert garden map to object for saving to localstorage
    mapToObj(map: Map<string, MyPlant>): Record<string, MyPlant> {
    return Object.fromEntries(map);
    }

    objToMap(obj: Record<string, MyPlant> | null | undefined): Map<string, MyPlant> {
      if (!obj) return new Map(); // Return empty map if null/undefined
      return new Map(Object.entries(obj));
    }
    

static fromJson(obj: any): User {
  const user = new User(
    obj.id,
    obj.username,
    obj.email,
    obj.street,
    obj.city,
    obj.state, 
    obj.zip,
    obj.country,
    obj.password
  ) 

  if (obj.garden) {
    user.gardenMap = new Map(
      obj.garden.map(([key, value]: [string, any]) => [key, MyPlant.fromJson(value)])
    );
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

export {
    User
}