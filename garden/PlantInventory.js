class PlantInventory {
    // Matches the original function name/behavior
    static findPlant(selectedVeg) {
        const foundPlant = this.plantInventory.find(item => item.title === selectedVeg);
        return foundPlant ? { title: foundPlant.title, img: foundPlant.img } : null;
    }
    // Matches the original function name/behavior
    static filter() {
        const userInput = document.getElementById("myInput");
        const userInputLowerCase = userInput.value.toLowerCase();
        const dropDownList = document.getElementById("myDropdown");
        const items = Array.from(dropDownList.getElementsByTagName("button"));
        items.forEach(item => {
            var _a;
            const txtValue = (_a = item.textContent) !== null && _a !== void 0 ? _a : "";
            item.style.display = txtValue.toLowerCase().includes(userInputLowerCase) ? "" : "none";
        });
    }
    // Matches the original function name/behavior
    static filterForMap() {
        const userInput = document.getElementById("myMapInput");
        const userInputLowerCase = userInput.value.toLowerCase();
        const dropDownList = document.getElementById("filter-map-dropdown");
        const items = Array.from(dropDownList.getElementsByTagName("button"));
        items.forEach(item => {
            var _a;
            const txtValue = (_a = item.textContent) !== null && _a !== void 0 ? _a : "";
            item.style.display = txtValue.toLowerCase().includes(userInputLowerCase) ? "" : "none";
        });
    }
}
PlantInventory.plantInventory = [
    { title: "Tomato, Heirloom", img: "images/heirloom.jpg" },
    { title: "Squash, Butternut", img: "images/butternutsquash.jpg" },
    { title: "Eggplant, Japanese", img: "images/eggplant.jpg" },
    { title: "Lettuce, Romaine", img: "images/romaine.jpg" },
    { title: "Pepper, Green Bell", img: "images/greenbell.jpg" },
    { title: "Apple, Green", img: "images/greenapple.jpeg" },
    { title: "Pepper, Banana", img: "images/bananapepper.jpg" },
    { title: "Pepper, Red Bell", img: "images/redbell.jpg" },
    { title: "Pepper, Shishito", img: "images/shishito.jpg" },
    { title: "Tomato, San Marzano", img: "images/sanmarzano.jpg" },
    { title: "Tomato", img: "images/tomato.jpg" },
    { title: "Tomato, Cherry", img: "images/cherrytomato.jpg" },
    { title: "Tomato, Orange Cherry", img: "images/orangecherry.jpg" },
    { title: "Onion, Red", img: "images/redonions.png" },
    { title: "Squash, Zucchini", img: "images/zucchini.jpg" },
    { title: "Squash, Yellow", img: "images/yellowsquash.jpg" },
    { title: "Onion, Yellow", img: "images/yellowonion.jpg" },
    { title: "Cucumber", img: "images/cucumber.jpg" },
    { title: "Apple, Red", img: "images/redapple.jpg" },
    { title: "Kale, Curly", img: "images/curlykale.jpg" }
];
export { PlantInventory };
