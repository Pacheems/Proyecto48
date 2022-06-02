var ocean, oceanImg;
var ajolote, ajoloteImg;
var obstacle, obstacleImg, obstaclesGroup;
var gameState = "play"


function preload(){
  oceanImg = loadImage("./image/ocean.png");
  obstacleImg = loadImage("./image/obstaculo.png");
  ajoloteImg = loadAnimation("./image/ajolote1.png","./image/ajolote1.png","./image/ajolote2.png","./image/ajolote2.png","./image/ajolote3.png","./image/ajolote3.png");
}

function setup(){
  createCanvas(600,600);
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = 1;
  
  obstaclesGroup= new Group();
  ajolote = createSprite(200,200,50,50);
  ajolote.scale = 0.1;
  ajolote.addAnimation("ajolote", ajoloteImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ajolote.x = ajolote.x - 3
    }
    
    if(keyDown("right_arrow")){
      ajolote.x = ajolote.x + 3
    }
    
    if(keyDown("space")){
      ajolote.velocityY = -10
    }
    
    ajolote.velocityY = ajolote.velocityY + 0.8
    
   
    if(ocean.y > 400){
      ocean.y = 300
    }

    spawnObstacles();

    if(obstaclesGroup.isTouching(ajolote) || ajolote.y > 600){
      ajolote.velocityY = 0;
      ajolote.destroy();
      gameState = "end"
    }
    

    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnObstacles(){
  //escribir código aquí para aparecer puertas en la torre.
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(200, -50);
    obstacle.scale = 0.2;
    
    obstacle.x = Math.round(random(0,600));
    
    obstacle.addImage(obstacleImg);
    
    obstacle.velocityY = 1;
    
    ajolote.depth = obstacle.depth;
    ajolote.depth +=1
   
    //asignar tiempo de vida a la variable
    obstacle.lifetime = 800;

    
    //agregar cada puerta al grupo.
    obstaclesGroup.add(obstacle);
  }
}

