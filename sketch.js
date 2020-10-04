
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyRunning;

var ground;

var foodGroup, bananaImage, banana;

var obstacleGroup, obstacleImage, obstacle;

var survivalTime = 0;

var score = 0;


function preload() {

 monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.scale = 0.1;
  monkey.addAnimation("moving", monkeyRunning);

  ground = createSprite(400, 350, 1500, 10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x)

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
 
  score = 0;
  

}

function draw() {
  background("lightgray");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("SurvivalTime: " + survivalTime, 100, 50);
  
  if (gameState===PLAY){
    
  if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 2;
    }
    
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  spawnBanana();
  spawnObstacle();
    
  if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      
    }
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    
    }
  }
   else if (gameState === END) {

    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     if(keyDown("r")) {
       reset();
     }
       
   }

  drawSprites();
}

function spawnBanana(){
  
  if (frameCount % 80 === 0) {
        var banana = createSprite(600, 200, 20, 20);
        banana.y = Math.round(random(120, 200));
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.velocityX = -(8+(score/10));    

        banana.lifetime = 80;

        foodGroup.add(banana);
      }
  
}

function spawnObstacle(){
  
  if (frameCount % 300 === 0) {
        var obstacle = createSprite(600, 320, 20, 20);
        obstacle.y = Math.round(random(320, 320));
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.15 ;
        obstacle.velocityX = -(8+(score/10));

        obstacle.lifetime = 80;

        obstacleGroup.add(obstacle);
      }
  
}

function reset(){
  gameState = PLAY;
  
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
    
  
  
  score = 0;
  
}
