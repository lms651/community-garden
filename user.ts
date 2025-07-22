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
    // garden: Record<string, MyPlant> = {};


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

    objToMap(obj: Record<string, MyPlant> | null | undefined): Map<string, MyPlant> {
      if (!obj) return new Map(); // Return empty map if null/undefined
      return new Map(Object.entries(obj));
    }
    
    
static fromJson(obj: any): User {
  const user = new User(
    obj.name,
    obj.username,
    obj.email,
    obj.street,
    obj.city,
    obj.state,
    obj.zip,
    obj.country,
    obj.password
  );
  // Restore garden if present
  if (obj.garden) {
    user.gardenMap = user.objToMap(obj.garden);
  }
  return user;
  }

}

export {
    User
}
