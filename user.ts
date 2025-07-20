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
  }

    static loadNextId(): number {
        const stored = localStorage.getItem("userNextId");
        return stored ? parseInt(stored) : 1;
    }

    static saveNextId(id: number): void {
        localStorage.setItem("userNextId", id.toString());
    }
}

export {
    User
}
