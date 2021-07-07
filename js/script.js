'use strict';

/*---------------------------------------- Constructer Function Block ----------------------------------------*/
Item.objectsContainer = [];
let productNameArr = [];

function Item(productName, sourceLink) {
    this.productName = productName;
    this.sourceLink = sourceLink;
    this.shownTimes = 0;
    this.clickTimes = 0;
    this.clickPerShowPercantage = 0;
    Item.objectsContainer.push(this);
    productNameArr.push(this.productName);
};

/*---------------------------------------- Instances of Constructer Functon ----------------------------------------*/

let listOfImagesNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

let listOfImagesLinks = ['images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg', 'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg',
    'images/pet-sweep.jpg', 'images/scissors.jpg', 'images/shark.jpg', 'images/sweep.png',
    'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/water-can.jpg', 'images/wine-glass.jpg'
];

for (let i = 0; i < listOfImagesNames.length; i++) {
    new Item(listOfImagesNames[i], listOfImagesLinks[i]);
};

/*---------------------------------------- [Rendering Images] [Modify] source Shown Percantage  ----------------------------------------*/
function randomizer() {
    return Math.floor(Math.random() * (Item.objectsContainer.length - 1));
};

let leftElement = document.getElementById('leftElement');
let centerELement = document.getElementById('centerElement');
let rightElement = document.getElementById('rightElement');

let leftIndex, centerIndex, rightIndex;
let instances = [];

function renderThreeImages() {

    do {
        leftIndex = randomizer();
        centerIndex = randomizer();
        rightIndex = randomizer();
    } while (instances.includes(leftIndex) || instances.includes(centerIndex) || instances.includes(rightIndex) || leftIndex == centerIndex || centerIndex == rightIndex || rightIndex == leftIndex || instances.includes(leftIndex) || instances.includes(centerIndex) || instances.includes(rightIndex));


    let LeftInstance = Item.objectsContainer[leftIndex];
    let centerInstance = Item.objectsContainer[centerIndex];
    let rightInstance = Item.objectsContainer[rightIndex];

    instances = [];
    instances.push(leftIndex, centerIndex, rightIndex);

    leftElement.src = LeftInstance.sourceLink;
    centerELement.src = centerInstance.sourceLink;
    rightElement.src = rightInstance.sourceLink;

    LeftInstance.shownTimes++;
    centerInstance.shownTimes++;
    rightInstance.shownTimes++;
};

renderThreeImages();

/*-------------------- s [Modify] ClickTimes [Invoke] RenderThreeImages [Display] Button --------------------*/
const maxAttempts = 25;
let counter = 0;

leftElement.addEventListener('click', handleClick);
centerELement.addEventListener('click', handleClick);
rightElement.addEventListener('click', handleClick);

function handleClick(event) {
    let LeftInstance = Item.objectsContainer[leftIndex];
    let centerInstance = Item.objectsContainer[centerIndex];
    let rightInstance = Item.objectsContainer[rightIndex];

    let resultShowButton = document.getElementById("showButton");
    counter++;
    if (counter < maxAttempts) {

        if (event.target.id === 'leftElement') {
            LeftInstance.clickTimes += 1;
        } else if (event.target.id === 'centerElement') {
            centerInstance.clickTimes += 1;
        } else if (event.target.id === 'rightElement') {
            rightInstance.clickTimes += 1;
        }

        renderThreeImages();

        LeftInstance.clickPerShowPercantage = Math.round((LeftInstance.clickTimes * 100) / LeftInstance.shownTimes);
        centerInstance.clickPerShowPercantage = Math.round((centerInstance.clickTimes * 100) / centerInstance.shownTimes);
        rightInstance.clickPerShowPercantage = Math.round((rightInstance.clickTimes * 100) / rightInstance.shownTimes);

    } else if (maxAttempts == 25) {
        resultShowButton.style.display = "block";
    };
}


/*--------------- [[RenderResults Event]] forloop [Remove] EventsListener [Invoke] PushToLocalStorage renderChart---------------*/

let resultFrame = document.getElementById('Results')
let resultShowButton = document.getElementById('showButton');
resultShowButton.addEventListener('click', renderResults);

let clickTimesArr = [];
let shownTimesArr = [];

function renderResults() {

    for (let i = 0; i < Item.objectsContainer.length; i++) {
        clickTimesArr.push(Item.objectsContainer[i].clickTimes);
        shownTimesArr.push(Item.objectsContainer[i].shownTimes);
        let UnorderedList = document.getElementById('UnorderedList');
        let list = document.createElement('li');
        UnorderedList.appendChild(list);
        list.textContent = `${Item.objectsContainer[i].productName} : Picked (${Item.objectsContainer[i].clickTimes}) Seen (${Item.objectsContainer[i].shownTimes}) percentage (${Item.objectsContainer[i].clickPerShowPercantage}%) `
    }

    resultFrame.style.display = "block";

    resultShowButton.removeEventListener('click', renderResults);
    leftElement.removeEventListener('click', handleClick);
    centerELement.removeEventListener('click', handleClick);
    rightElement.removeEventListener('click', handleClick);

    pushToLocalStorage();
    renderChart();
};

/*---------------------------------------- [Render Chart] ----------------------------------------*/

function renderChart() {

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {

        data: {
            datasets: [{
                type: 'bar',
                label: 'Shown Times',
                data: shownTimesArr,
                order: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderWidth: 1
            }, {

                type: 'bar',
                label: 'Picked Times',
                data: clickTimesArr,
                order: 2,
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',
                ],

                borderWidth: 1
            }],
            labels: productNameArr,

        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'The Results of showing and clicking by the user'
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                }
            }
        }
    });
}


/*---------------------------------------- [Local Storage]----------------------------------------*/

function pushToLocalStorage() {
    let stringfiedInstances = JSON.stringify(Item.objectsContainer);
    localStorage.setItem("Item", stringfiedInstances);
};

function pullFromLocalStorage() {
    let instances = localStorage.getItem("Item");
    let ParsiedInstances = JSON.parse(instances);
    if (ParsiedInstances != null) {
        Item.objectsContainer = ParsiedInstances;
    };

};

pullFromLocalStorage();