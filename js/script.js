'use strict';


Item.objectsContainer = [];

function Item(productName, sourceLink) {
    this.productName = productName;
    this.sourceLink = sourceLink;
    this.shownTimes = 0;
    this.clickTimes = 0;
    this.clickPerShowPercantage = 0;
    Item.objectsContainer.push(this);

};


Item.prototype.clickPerVeiwsPercantagefn = function() {
    this.clickPerShowPercantage = Math.floor((this.clickTimes * 100) / this.shownTimes);


};


new Item('bag', 'images/bag.jpg');
new Item('banana', 'images/banana.jpg');
new Item('bathroom', 'images/bathroom.jpg');
new Item('boots', 'images/boots.jpg');
new Item('breakfast', 'images/breakfast.jpg');
new Item('bubblegum', 'images/bubblegum.jpg');
new Item('chair', 'images/chair.jpg');
new Item('cthulhu', 'images/cthulhu.jpg');
new Item('dog-duck', 'images/dog-duck.jpg');
new Item('dragon', 'images/dragon.jpg');
new Item('pen', 'images/pen.jpg');
new Item('pet-sweep', 'images/pet-sweep.jpg');
new Item('scissors', 'images/scissors.jpg');
new Item('shark', 'images/shark.jpg');
new Item('sweep', 'images/sweep.png');
new Item('tauntaun', 'images/tauntaun.jpg');
new Item('unicorn', 'images/unicorn.jpg');
new Item('water-can', 'images/water-can.jpg');
new Item('wine-glass', 'images/wine-glass.jpg');


/*---------------------------------------- Rendering Images ----------------------------------------*/
function randomizer() {
    return Math.floor(Math.random() * Item.objectsContainer.length);
};

let leftElement = document.getElementById('leftElement');
let centerELement = document.getElementById('centerElement');
let rightElement = document.getElementById('rightElement');

let leftIndex;
let centerIndex
let rightIndex;

function renderThreeImages() {

    leftIndex = randomizer();
    centerIndex = randomizer();
    rightIndex = randomizer();

    while (leftIndex == centerIndex || centerIndex == rightIndex || rightIndex == leftIndex) {
        leftIndex = randomizer();
        centerIndex = randomizer();
        rightIndex = randomizer();
    }

    leftElement.src = Item.objectsContainer[leftIndex].sourceLink;
    centerELement.src = Item.objectsContainer[centerIndex].sourceLink;
    rightElement.src = Item.objectsContainer[rightIndex].sourceLink;

    Item.objectsContainer[leftIndex].shownTimes++;
    Item.objectsContainer[centerIndex].shownTimes++;
    Item.objectsContainer[rightIndex].shownTimes++;
    console.log(Item.objectsContainer);
};

renderThreeImages();

/*---------------------------------------- Clicking On Picture Event ----------------------------------------*/
const maxAttempts = 25;
let counter = 0;

leftElement.addEventListener('click', handleClick);
centerELement.addEventListener('click', handleClick);
rightElement.addEventListener('click', handleClick);

function handleClick(event) {
    let resultShowButton = document.getElementById("showButton");
    counter++;
    if (counter <= maxAttempts) {

        if (event.target.id === 'leftElement') {
            Item.objectsContainer[leftIndex].clickTimes++;
            Item.objectsContainer[leftIndex].clickPerVeiwsPercantagefn();

        } else if (event.target.id === 'centerElement') {
            Item.objectsContainer[centerIndex].clickTimes++;
            Item.objectsContainer[centerIndex].clickPerVeiwsPercantagefn();
        } else if (event.target.id === 'rightElement') {
            Item.objectsContainer[rightIndex].clickTimes++;
            Item.objectsContainer[rightIndex].clickPerVeiwsPercantagefn();
        }
        renderThreeImages();
    } else {
        resultShowButton.style.display = "block";
    }
}


/*---------------------------------------- Showing Results Event ----------------------------------------*/
let resultFrame = document.getElementById('Results')
let resultShowButton = document.getElementById('showButton');
resultShowButton.addEventListener('click', renderResults);

function renderResults() {


    for (let i = 0; i < Item.objectsContainer.length; i++) {
        let UnorderedList = document.getElementById('UnorderedList');
        let list = document.createElement('li');
        UnorderedList.appendChild(list);
        list.textContent = `${ Item.objectsContainer[i].productName} : Picked (${Item.objectsContainer[i].clickTimes}) Seen (${Item.objectsContainer[i].shownTimes}) percentage (${Item.objectsContainer[i].clickPerShowPercantage}%) `

    }
    resultShowButton.removeEventListener('click', renderResults);
    resultShowButton.removeEventListener('click', renderResults);
    resultShowButton.removeEventListener('click', renderResults);
    resultFrame.style.display = "block";


};