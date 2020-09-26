'use strict';
//global variables

//array to store all the objects
var allProducts = [];  
//array to store all votes for all objects(on all images)
var allVotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//array to store all timesDisplayed for all objects(on all images)
var allTimeDisplayed  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//array to store all the names for all objects(on all images)
var allImageNames = [];
//get the elements from HTML page 
var leftImageElement = document.getElementById('leftImage');
var middleImageElement = document.getElementById('middleImage');
var rightImageElement = document.getElementById('rightImage');
//variables to store a random numbers in, which refers to the index of the allProducts array
var leftImageIndex = -1;
var middleImageIndex = -1;
var rightImageIndex = -1;
//variables for the images which will be displayed
var currentLeftImage;
var currentMiddleImage;
var currentRightImage;
//variable to store the number of user clicks
var totalClicks = 25;

//creating the constructor
function productImage(productName , imgPath){
    this.productName = productName;
    this.imgPath = imgPath;
    this.votes = 0;
    this.timesDisplayed = 0;
    allProducts.push(this);  //push is used to fill the array
    }

    if(localStorage.getItem('allVotes')){
      allVotes=JSON.parse(localStorage.getItem('allVotes'));
      console.log('there is ');

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

//function to aggregate the sum of the AllVotes array in each round
//   var sum = [0];
//   function summationOfVotes(){
//   for(var i=0; i < allVotes.length; i++){
//     sum.push(sum[i] + allVotes[i]);
//   }
//     console.log( 'we are in the summationOfVotes function and the sum of all votes is ', sum[i] + allVotes[i]);
//     return sum;
// }

//Function to compare the images with the previous row
function contains(element, arr){
  for(var i = 0; i<arr.length; i++){
    if(arr[i] === element){
      return true;
    }
  }
  return false;
}

//Function to generate random images
function generateRandomImages(){

    var previouslyDisplayed = [leftImageIndex,middleImageIndex,rightImageIndex];
    //generate the random numbers
    leftImageIndex = (Math.floor(Math.random() * allProducts.length));
    middleImageIndex = Math.floor((Math.random() * allProducts.length));
    rightImageIndex = Math.floor((Math.random() * allProducts.length));

    //guarantee that each image in the row will not appear in the same row or the previous row
    //compare the left with the previous
    while(contains(leftImageIndex,previouslyDisplayed)){
      leftImageIndex = (Math.floor(Math.random() * allProducts.length));
    }
    //compare the middle with the left and previous 
    while(middleImageIndex===leftImageIndex || contains(middleImageIndex,previouslyDisplayed) ){
    middleImageIndex = Math.floor((Math.random() * allProducts.length));
    }
    //compare the right with the left and middle and previous 
    while(rightImageIndex===leftImageIndex || rightImageIndex===middleImageIndex || rightImageIndex === contains(rightImageIndex,previouslyDisplayed)){
    rightImageIndex = Math.floor((Math.random() * allProducts.length));
    }
    displayRandomImages (leftImageIndex,middleImageIndex,rightImageIndex);
}

//Function to display random images
function displayRandomImages (left,middle,right){
  
    currentLeftImage = allProducts[left];
    currentMiddleImage = allProducts[middle];
    currentRightImage = allProducts[right];

    //increase the time of image by 1 each time it appears
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
        // console.log('left');
  } else if(event.target.id === 'middleImage'){
        clickedImage = currentMiddleImage;
        // console.log('middle');
  } else if(event.target.id === 'rightImage'){
        clickedImage = currentRightImage;
        // console.log('right');
  }

  if(clickedImage){
    clickedImage.votes++;
    generateRandomImages();
    totalClicks--;
  }
  // console.log('votes  ' + clickedImage.votes );
  // console.log('clicks  ' + totalClicks);

 
  if(totalClicks <= 0){
    imagesSection.removeEventListener('click',handleVote);
    fillTheArrays();

  localStorage.setItem('allVotes',JSON.stringify(allVotes));
    displayResults();
    chart();
    // console.log('thank you');
  }
}
var form = document.getElementById('form');
form.addEventListener('submit',newClick);

function newClick(event){
  totalClicks = Number(document.getElementById('numberOfClick').value);
  event.preventDefault();
}

function displayResults(){
    var listItem;
    for(var i = 0; i < allProducts.length; i++){
        listItem = document.createElement('li');
        listItem.textContent = 'Displayed Times for '+ allProducts[i].productName + ' is ' + allProducts[i].timesDisplayed + ' and votes are ' + allProducts[i].votes;
        resultsList.appendChild(listItem);
    }
}

//function to fill the proprties of the objects, each one inside a separate array 
function fillTheArrays(){ 
  for (var i=0; i < allProducts.length;i++){
    allVotes[i]+= allProducts[i].votes;
    allTimeDisplayed[i]+= allProducts[i].timesDisplayed;
    allImageNames[i]=allProducts[i].productName;
  }
  //after we fill the allVotes array we call the summationOfVotes function 
  //to aggregate the votes with the previous round votes 
  // console.log(summationOfVotes()); 
}

//chart
function chart(){ 


var lineChart = document.getElementById('myChart');
var myChart = new Chart(lineChart, {
    type: 'bar',
    data: {
        labels: allImageNames,

        datasets: 
        [
        { //first element in the datasets array
          label: '# of Votes',
          data: allVotes,
          backgroundColor: [  //yellow
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)'
          ],
          borderColor: [
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)',
            'rgb(249, 249, 47)'
          ],
          borderWidth: 1
      },
      //second element in the datasets array
      {
        label: '# of Displayed Times',
        data: allTimeDisplayed,
        backgroundColor: [  //dark gray
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)'
        ],
        borderColor: [
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)',
          'rgb(81, 81, 73)'
        ],
        borderWidth: 1
    }
    ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
} //end of chart function


// localStorage.setItem('all votes',summationOfVotes());

// sum = JSON.stringify(summationOfVotes());


// console.log(storeArr);
// localStorage.setItem('sum',sum);





/////////////////////LAB 13//////////////////////
//to add to localstorage (key,value) 
//key refers to the label or pointer or variable that contain the value that will be persistent in local storage 
// localStorage.setItem('item',5);
//to read from local storage
// localStorage.getItem('item');
//to clear thelocal storage
// localStorage.clear();
//to remove a specific item
// localStorage.removeItem('item')
//convert the JS object to a JSON object (convert the objects to strings)
// var JSobj = new Object('hi','hi');
// var JSONobj = JSON.stringify(sum);









