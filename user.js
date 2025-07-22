class User {
    // garden: Record<string, MyPlant> = {};
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
    static fromJson(obj) {
        const user = new User(obj.name, obj.username, obj.email, obj.street, obj.city, obj.state, obj.zip, obj.country, obj.password);
        // Restore garden if present
        if (obj.garden) {
            user.gardenMap = user.objToMap(obj.garden);
        }
        return user;
    }
}
User.nextId = User.loadNextId();
export { User };
