// Global variables 
let button = document.getElementById('btn');
let form = document.getElementById('dino-compare');
let array = [];

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when; 
    this.facts = facts; 
}

// Create Dino Objects
let dino1 = new Dino("Triceratops", 13000, 114, "herbavor", "North America", "Late Cretaceous", 
 ["First discovered in 1889 by Othniel Charles Marsh"]);

let dino2 = new Dino("Tyrannosaurus Rex", 11905, 144, "carnivor", "North America", "Late Cretaceous", 
 ["The largest known skull measures in at 5 feet long."]);

let dino3 = new Dino("Anklyosaurus", 10500, 55, "herbavor", "North America", "Late Cretaceous", 
 ["Anklyosaurus survived for approximately 135 million years."]);

let dino4 = new Dino("Brachiosaurus", 70000, 372, "herbavor", "North America", "Late Jurasic", 
 ["An asteroid was named 9954 Brachiosaurus in 1991."]);

let dino5 = new Dino("Stegosaurus", 11600, 79, "herbavor", "North America, Europe, Asia","Late Jurasic to Early Cretaceous", 
 ["The Stegosaurus had between 17 and 22 seperate places and flat spines."]);

let dino6 = new Dino("Elasmosaurus", 16000, 59, "carnivor", "North America", "Late Cretaceous", 
 ["Elasmosaurus was a marine reptile first discovered in Kansas."]);

let dino7 = new Dino("Pteranodon", 44, 20, "carnivor", "North America", "Late Cretaceous", 
 ["Actually a flying reptile, the Pteranodon is not a dinosaur."]);

let dino8 = new Dino("Pigeon", 0.5, 9, "herbavor", "World Wide", "Holocene", 
 ["All birds are living dinosaurs."]);


// Create Human Class and its Constructor
class Human {
    constructor(name, height, weight, continent, diet) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.continent = continent;
        this.diet = diet;
    }
}

// Create Human Object
let human = new Human(); 

// Use IIFE to get human data from form
let humanData = (function arwa() {
    let name = document.getElementById('name');
    let feet = document.getElementById('feet');
    let inches = document.getElementById('inches');
    let weight = document.getElementById('weight');
    let continent = document.getElementById('continent');
    let diet = document.getElementById('diet');

    let height = (feet * 12) + inches;

    return {name, height, weight, continent, diet}
}());

// Get humanData:
// Update human object datd 
function completeHumanObject() {
    human.name = humanData.name.value
    human.height = humanData.height.value
    human.weight = humanData.weight.value
    human.continent = humanData.continent.value
    human.diet =  humanData.diet.value
}

// Shuffle Array:
// to rearrange the dinosaurs 
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Compare Method 1:
// * Take two arguments which are human object and dinasour object
// * Compare the height of the human and the selected dinasour
// * Return a string to indicate which are taller 
function compareHeight(human, dino) {
    if (human.height == dino.height) {
        return 'All are in same height'
    } else if (human.height < dino.height) {
        return dino.species + ' taller than '+ human.name
    } else {
        return human.name + ' taller than ' + dino.species
    }
}

// Compare Method 2:
// * Take two arguments which are human object and dinasour object
// * Compare the weight of the human and the selected dinasour
// * Return a string to indicate which are heavier 
function compareWeight(human, dino) {
    if (human.weight == dino.weight) {
        return 'All are in same weight'
    } else if (human.weight < dino.weight) {
        return dino.species + ' heavier than '+ human.name
    } else {
        return human.name + ' heavier than ' + dino.species
    }
}

// Compare Method 3:
// * Take two arguments which are human object and dinasour object
// * Compare the continent of the human and the selected dinasour
// * Return a string to indicate they are form smae continent or not 
function compareContinent(human, dino) {
    if (dino.where.includes(human.continent)) {
        return human.name + " and " + dino.species + " are from same continent which is " + human.continent
    } else {
        return human.name + " " + dino.species + " are from diffrent continent, " 
                + human.name + " is from " + human.continent + " and " + dino.species + " is from " + dino.where
    }
}

// Valdiate form data:
// Check if all field are fill or not, if all filled return true, otherwise return false and alert user
function isNotVaildData() {
    let name = document.getElementById('name').value;
    let feet = document.getElementById('feet').value;
    let inches = document.getElementById('inches').value;
    let weight = document.getElementById('weight').value;

    if (name == "" & feet == "" & inches == "" & weight == "") {
        alert("Please fil all fields")
        return true
    } else if (name == "") {
        alert("Please fil human name")
        return true
    } else if (feet == "" || inches == ""){
        alert("Please fil human height")
        return true
    } else if (weight == "") {
        alert("Please fil human weight")
        return true
    }
    
    return false
}

// 
function regenerateInfoghraphic() {

    let grid = document.getElementById('grid');
    let regenerateInfoghraphicButton = document.createElement('div');

    // Button 
    regenerateInfoghraphicButton.className = 'my-btn';
    regenerateInfoghraphicButton.textContent = 'Regenerate Infographic';
    regenerateInfoghraphicButton.id = 'btn2';
    grid.after(regenerateInfoghraphicButton);

    
    // Regenerate infographic:
    // Hide infoghraphic and show form + reset inputs
    document.getElementById('btn2').addEventListener('click', function(){
        form.style.display = 'block';
        grid.style.display = 'none';

        // Reset inputs
        document.getElementById('name').value = '';
        document.getElementById('feet').value = '';
        document.getElementById('inches').value = '';
        document.getElementById('weight').value = '';

        

        regenerateInfoghraphicButton.remove();
    })
}

// This function to give every dino facts by comaring functions 
// Also generate facts for human object 
function generateAnotherFacts(array) {
    human.facts = []
    for (let i = 0; i < array.length; i++) {

        if (array[i].species != "Pigeon"){
            array[i].facts.push(compareWeight(human, array[i]))
            array[i].facts.push(compareHeight(human, array[i]))
            array[i].facts.push(compareContinent(human, array[i]))
        }
        
        human.facts.push(compareWeight(human, array[i]))
    }
    
}

// Generate Tiles:
// This function do:
// (1) Generate a random array of dinosaurs
// (2) Put human in the middale
// (3) Generate Tiles: with check the type of thw object
function generateTiles() {

    // Declare array that include dinosaurs data with random arrange
    array = shuffle([dino1, dino2, dino3, dino4, dino5, dino6, dino7, dino8])

    // ** complete the human object with data pulled from the form when “Compare me” is clicked **
    completeHumanObject()

    // Add more facts to dinosaurs 
    generateAnotherFacts(array)

    // Insert human in center 
    array.splice(4,0, human);

    // Grid 
    let grid = document.getElementById('grid');
    if (grid.style.display == 'none') {
        grid.style.display = 'block'
    }
    // loop in array to generate tiles for each elements 
    array.forEach( element => {
        let gridItem = document.createElement('div');
        let h3 = document.createElement('h3');
        let img = document.createElement('img');
        let p = document.createElement('p');
    
        gridItem.className = 'grid-item';

        // Check if the element tyoe is Dino or Human
        if (element instanceof Dino) {
            img.src = './images/' + element.species + '.png';
            h3.textContent = element.species;

            // ** use Math.floor() and Math.random() to apply randomness to  dino facts.
            let arraySize = element.facts.length;
            p.textContent = element.facts[Math.floor(Math.random() * arraySize)];
            gridItem.appendChild(p);
        } else {
            img.src = './images/human.png';
            h3.textContent = element.name;
            p.textContent = human.facts[Math.floor(Math.random() * human.facts.length)]
            gridItem.appendChild(p);
        }

        gridItem.appendChild(h3);
        gridItem.appendChild(img);
        grid.appendChild(gridItem);

    }); 

}

// On button click, prepare and display infographic
button.addEventListener("click", function() {

    if (isNotVaildData()) {
        return
    }

    // Add tiles to DOM
    generateTiles()

    // Remove form from screen
    form.style.display = 'none'

    regenerateInfoghraphic()
})









