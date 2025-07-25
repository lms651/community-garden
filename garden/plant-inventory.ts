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

export {
    findPlant,
    plantInventory,
    Plant,
    filter
}