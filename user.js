class User {
    constructor(name, username, email, street, city, state, zip, country, password) {
        this.garden = {};
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
    // Convert object to garden map for loading
    objToMap(obj) {
        return new Map(Object.entries(obj));
    }
}
User.nextId = User.loadNextId();
export { User };
