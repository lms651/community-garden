interface Plant {
  title: string;
  img: string;
}

const plantInventory: Plant[] = [
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

function findPlant(selectedVeg: string): Plant | null {
    const foundPlant = plantInventory.find(item => item.title === selectedVeg);
    if (foundPlant) {
    return { title: foundPlant.title, img: foundPlant.img };
  }
  return null;  // not found
}

// Filter Function for Dropdown
function filter(): void { 
  const userInput = document.getElementById("myInput") as HTMLInputElement;
  const userInputLowerCase = userInput.value.toLowerCase();
  const dropDownList = document.getElementById("myDropdown") as HTMLInputElement;
  const items: HTMLButtonElement[]  = Array.from(dropDownList.getElementsByTagName("button"));

  items.forEach(item => {
    const txtValue = item.textContent!;
    if (txtValue.toLowerCase().indexOf(userInputLowerCase) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// dropdown for map filter by veg
function filterForMap(): void { 
  const userInput = document.getElementById("myMapInput") as HTMLInputElement;
  const userInputLowerCase = userInput.value.toLowerCase();
  const dropDownList = document.getElementById("filter-map-dropdown") as HTMLInputElement;
  const items: HTMLButtonElement[]  = Array.from(dropDownList.getElementsByTagName("button"));

  items.forEach(item => {
    const txtValue = item.textContent!;
    if (txtValue.toLowerCase().indexOf(userInputLowerCase) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}


export {
    findPlant,
    plantInventory,
    Plant,
    filter,
    filterForMap
}