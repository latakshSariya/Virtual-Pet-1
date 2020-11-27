//Create variables here
var database;
var dog;
var dog1 , happyDog;
var Food;


function preload()
{
  dog1 = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  //create Sprites here
  database = firebase.database();
  dog = createSprite(250,250,50,50);
  dog.scale = 0.2;
  dog.addImage("dog1" , dog1);
  dog.addImage("dog2" , happyDog);
  var feedDog = database.ref('Food');
  feedDog.on("value" , readFood , showError);

}


function draw() {  
  background(color(46, 139, 87))
  drawSprites();
  textSize(30);
  fill("black")
  text("Press UP ARROW to feed Dog" , 50,100);
  text("foodRemaining: " + Food ,120,400)
  text("Press Down Arrow To add Food" , 40,450)

  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(Food);
    dog.changeImage("dog2",happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.changeImage("dog1" , dog1)
  }
  if(keyWentDown(DOWN_ARROW)){
    addStock(Food);
  }
}

function readFood(data) {
  Food = data.val();
}

function showError(){
  console.log("Errr! You Are getting a error");
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').set({
    Food:x
  })
}

function addStock(x){
  if(x<=0){
    x=x+2; 
  }else{
    x=x+1
  }
  database.ref('/').set({
    Food:x
  })
}


