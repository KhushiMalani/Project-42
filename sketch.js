var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage;
var obstacle, obstacleImage;
var gameOver, gameOverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
  gameOverImage= loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup= new Group();
  obstacleGroup= new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    spawnFood();
    createObstacles();
    if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if (foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score=score+2;
      player.scale+=+0.05;
    }
    if(obstacleGroup.isTouching(player)){
      gameState=END;
      console.log("obstacle touch player");
    }
  
  }
else if(gameState===END){
  backgr.velocityX=0;
  console.log("game end");
  player.visible=false;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameOver= createSprite(400,100);
  gameOver.addImage(gameOverImage);
  stroke("white");
  textSize(30);
  fill("white");
  text("Game Over!",500,100);
  }

  drawSprites();
  stroke("white");
textSize(20);
fill("white");
text("Score:"+ score,500,50);
}
function spawnFood(){
  if (frameCount% 80==0){
    banana= createSprite(300,50);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(80,160));
    banana.velocityX=-6;
    banana.lifetime=100;
    foodGroup.add(banana);
  }
}
function createObstacles(){
  if(frameCount% 300==0){
    obstacle=createSprite(150,250) 
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=120;
    obstacleGroup.add(obstacle);
   obstacle.scale=0.1;
    obstacle.velocityX=-5;
   obstacle.depth = player.depth;
      player.depth = player.depth + 1;
    
  }
  } 
