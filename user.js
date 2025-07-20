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
    }
    static loadNextId() {
        const stored = localStorage.getItem("userNextId");
        return stored ? parseInt(stored) : 1;
    }
    static saveNextId(id) {
        localStorage.setItem("userNextId", id.toString());
    }
}
User.nextId = User.loadNextId();
export { User };
