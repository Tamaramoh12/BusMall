'use strict';

//global variables
//array to store all the objects
var allProducts = [];  
//get the elements from HTML page 
var leftImageElement = document.getElementById('leftImage');
var middleImageElement = document.getElementById('middleImage');
var rightImageElement = document.getElementById('rightImage');
//variables to store a random numbers in, which refers to the index of the allProducts array
var leftImageIndex;
var middleImageIndex;
var rightImageIndex;
//variables for the images which will be displayed
var currentLeftImage;
var currentMiddleImage;
var currentRightImage;
//variable to store the number of user clicks
var totalClicks = 0;

//creating the constructor
function productImage(productName , imgPath){
    this.productName = productName;
    this.imgPath = imgPath;
    this.votes = 0;
    this.timesDisplayed = 0;
    allProducts.push(this);  //push is used to fill the array
}

//create objects
new productImage('bag','images/bag.jpg');
new productImage('banana','images/banana.jpg');
new productImage('bathroom','images/bathroom.jpg');
new productImage('boots','images/boots.jpg');
new productImage('breakfast','images/breakfast.jpg');
new productImage('bubblegum','images/bubblegum.jpg');
new productImage('chair','images/chair.jpg');
new productImage('cthulhu','images/cthulhu.jpg');
new productImage('dog-duck','images/dog-duck.jpg');
new productImage('dragon','images/dragon.jpg');
new productImage('pen','images/pen.jpg');
new productImage('pet-sweep','images/pet-sweep.jpg');
new productImage('scissors','images/scissors.jpg');
new productImage('shark','images/shark.jpg');
new productImage('sweep','images/sweep.png');
new productImage('tauntaun','images/tauntaun.jpg');
new productImage('unicorn','images/unicorn.jpg');
new productImage('usb','images/usb.gif');
new productImage('water-can','images/water-can.jpg');
new productImage('wine-glass','images/wine-glass.jpg');

//Function to generate random images
function generateRandomImages(){
    leftImageIndex = (Math.floor(Math.random() * allProducts.length));
    middleImageIndex = Math.floor((Math.random() * allProducts.length));
    rightImageIndex = Math.floor((Math.random() * allProducts.length));

    var indexArray = [leftImageIndex,middleImageIndex,rightImageIndex];
    //to check that the  images are not the same
    for(var i = 0; i < indexArray.length; i++){
            if (indexArray[i] === indexArray[i+1]){ 
            middleImageIndex = Math.floor((Math.random() * allProducts.length));
            } else if (indexArray[i] === indexArray[i+2]){
            rightImageIndex = Math.floor((Math.random() * allProducts.length));
            } else if (indexArray[i+1] === indexArray[i+2]){
            middleImageIndex = Math.floor((Math.random() * allProducts.length));
            }
    }

    displayRandomImages (leftImageIndex,middleImageIndex,rightImageIndex);
}

//Function to display random images
function displayRandomImages (left,middle,right){
    currentLeftImage = allProducts[left];
    currentMiddleImage = allProducts[middle];
    currentRightImage = allProducts[right];

    currentLeftImage.timesDisplayed++;
    currentMiddleImage.timesDisplayed++;
    currentRightImage.timesDisplayed++;

    leftImageElement.setAttribute('src',currentLeftImage.imgPath);
    middleImageElement.setAttribute('src',currentMiddleImage.imgPath);
    rightImageElement.setAttribute('src',currentRightImage.imgPath);
}
generateRandomImages();


//Attach an event listener to the section of the HTML page
//where the images are going to be displayed.
imagesSection.addEventListener('click',handleVote);
var resultsList = document.getElementById('finalResult');

function handleVote(event){
  var clickedImage;

  if(event.target.id === 'leftImage'){
        clickedImage = currentLeftImage;
        console.log('left');
  } else if(event.target.id === 'middleImage'){
        clickedImage = currentMiddleImage;
        console.log('middle');
  } else if(event.target.id === 'rightImage'){
        clickedImage = currentRightImage;
        console.log('right');
  }

  if(clickedImage){
    clickedImage.votes++;
    generateRandomImages();
    totalClicks++;
  }
  console.log('votes  ' + clickedImage.votes);
  console.log('clicks  ' + totalClicks);


  if(totalClicks >= 25){
    imagesSection.removeEventListener('click',handleVote);
    displayResults();
    console.log('thank you');
  }
}

function displayResults(){
    var listItem;
    for(var i = 0; i < allProducts.length; i++){
        listItem = document.createElement('li');
        listItem.textContent = 'Displayed Times for '+ allProducts[i].productName + ' is ' + allProducts[i].timesDisplayed + ' and votes are ' + allProducts[i].votes;
        resultsList.appendChild(listItem);
    }
}

  
    
  
