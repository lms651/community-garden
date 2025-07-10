const plantInventory = [
  { title: "Tomato, Heirloom", img: "images/heirloom.jpg" },
  { title: "Squash, Butternut", img: "images/butternutsquash.jpg" },
  { title: "Eggplant, Japanese", img: "images/eggplant.jpg" },
  { title: "Lettuce, Romaine", img: "images/romaine.jpg" },
  { title: "Pepper, Green Bell", img: "images/greenbell.jpg" },
  { title: "Apple, Green", img: "images/greenapple.jpeg" },

];

function findPlant(selectedVeg) {
    const foundPlant = plantInventory.find(item => item.title === selectedVeg);
    if (foundPlant) {
    return { title: foundPlant.title, img: foundPlant.img };
  }
  return null;  // not found
}

export {
    findPlant,
    plantInventory
}