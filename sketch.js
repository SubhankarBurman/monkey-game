var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running,monkey_still;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var obstacles;
var ground;
var score,survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_still = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(70,350,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("still",monkey_still);
  monkey.scale = 0.1;
  
  ground = createSprite(300,370,600,10)
  
  score = 0;
  survivalTime = 0;
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,300,600);
}


function draw() {
  background(180);
  
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
 if(gameState===PLAY){
   
   monkey.changeAnimation("running");
   
  if(keyDown("space") && monkey.y >=330){
    
    monkey.velocityY = -12;
    
  }
  
  if(FoodGroup.isTouching(monkey)){
    
    score = score+1;
    FoodGroup.destroyEach();
    
  }
  if(obstacleGroup.isTouching(monkey)){

    gameState = END;
    
  }
  survivalTime = Math.ceil(frameCount/frameRate());
   
  obstacleAppear();
  food();
 }
  else if(gameState===END){
    
    stroke("white");
    textSize(18);
    fill("white");
    text("Press Space to play again",200,200);
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    monkey.changeImage("still");
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    if(keyDown("space")){
      
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      
      frameCount = 0; 
      score = 0;
      
      gameState=PLAY;
    }
  } 
  drawSprites();
  
  textSize(16);
  stroke("white");
  fill("white");
  text("Score: "+score,400,50)
  
  textSize(16);
  stroke("white");
  fill("white");
  text("Survival Time: "+survivalTime,200,50)
  
}
function obstacleAppear(){
  
  if(frameCount%80===0){
    obstacles = createSprite(600,340,10,10);
    obstacles.collide(ground);
    obstacles.velocityX = -6;
    obstacles.addImage("obstacles",obstacleImage);
    obstacles.scale = 0.15;
    obstacles.setCollider("circle",0,0,200);
    obstacles.lifeTime = 320;
    obstacleGroup.add(obstacles);
  }
}
function food(){
  
  if(frameCount%100===0){
    banana = createSprite(600,230,10,10);
    banana.velocityX = -6;
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.lifeTime = 300;
    FoodGroup.add(banana);
  }
}







