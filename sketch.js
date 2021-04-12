var PLAY =1;
var END = 0;
var score=0;
var gamestate= PLAY;
var cloudgroup,obstaclegroup
var restart,restartimage;
var gameover,gameoverimage;
var trex,trex_running;
var ground,groundimage;
var invisibleground;
var cloud,cloudimage;
var obstacle1,obstacle1image;
var obstacle2image;
var obstacle3image;
var obstacle4image;
var obstacle5image;
var obstacle6image;
var trexcolid,trexcolidimage;
var jumpsound,diesound,checksound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trexcolid=loadImage("trex_collided.png")
groundimage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
obstacle1image=loadImage("obstacle1.png")
obstacle2image=loadImage("obstacle2.png")
obstacle3image=loadImage("obstacle3.png")
obstacle4image=loadImage("obstacle4.png") 
obstacle5image=loadImage("obstacle5.png")
obstacle6image=loadImage("obstacle6.png")
  restartimage=loadImage("restart.png")
  gameoverimage=loadImage("gameOver.png")
  jumpsound=loadSound("jump.mp3")
  diesound=loadSound("die.mp3")
checksound=loadSound("checkPoint.mp3")

  
  
  
  
  
}


function setup(){
  createCanvas(600,200)
  trex = createSprite(150,150,50,50);
  trex.addAnimation("t",trex_running);
  trex.scale = 0.6
  ground = createSprite(0,160,12000,1)
  invisibleground =createSprite(0,170,12000,1)
  invisibleground.visible=false   
  ground.addImage("g",groundimage)
  
    restart = createSprite(250,100)
  restart.scale=0.5
  restart.addImage("r",restartimage)
  
  gameover= createSprite(250,50)
  gameover.scale=0.5
  gameover.addImage("g",gameoverimage)
  
  
  
  cloudgroup=createGroup () ;
  obstaclegroup=createGroup () ;
  

  trex.setCollider("circle",0,0,35)
}

function draw(){
  background("white")
 drawSprites();

  
  if (gamestate===PLAY )  {
  gameover.visible=false
  restart.visible=false
    score=score+Math.round (getFrameRate ()/60)
    if (score>0&&score%100===0) {
      checksound.play()
    }
    
     if (ground.x<0) {
    ground.x= ground.width/2
       
 }
    if ( keyDown("space")&& trex.y>100) { 
  trex.velocityY=-11
  jumpsound.play()
    
    
 }
    trex.velocityY=trex.velocityY+1       
    
       ground.velocityX=-(6+2*score/100)
spawncloud();
  spawnobstacle();

    if (obstaclegroup.isTouching(trex)) { 
    gamestate=END
    diesound.play()
      }}
  
  else if (gamestate===END) {
          cloudgroup.setVelocityXEach(0);
          obstaclegroup.setVelocityXEach(0);
obstaclegroup.setLifetimeEach(-1);
  cloudgroup.setLifetimeEach(-1);
            ground.velocityX=0 
       trex.addImage("t",trexcolid)
    trex.velocityY=0
  gameover.visible=true
  restart.visible=true
  
  if (mousePressedOver(restart)){
    reset()
  }
    
    
    
    
    
    
    
    
    
    
    
           }
  
  

  
  
  
  
 text ("score " +score,400,26)

  
  
  trex.collide(invisibleground)
  
}
function spawncloud(){
  if ( frameCount%100===0) {
      

   
cloud =  createSprite(484,32,45,50);
     trex.depth=cloud.depth
    trex.depth=trex.depth+1

      cloud.y=Math.round(random(10,60))
cloud.addImage(cloudimage)
  cloud.scale = 0.7
  cloud.velocityX=-(6+2*score/100)
    cloud.lifetime = 300
    
    cloudgroup.add(cloud);
    
    
}
}

function spawnobstacle () {
  if (frameCount%80===0) {
 
obstacle1=createSprite(600 ,140,100,100)
 obstacle1.scale=0.6 
  obstacle1.velocityX=-(6+2*score/100)
    obstacle1.lifetime = 300
    var r =Math.round(random(1,6))
    switch(r){
      case 1 : obstacle1.addImage(obstacle1image)
      break ;
      
       case 2 : obstacle1.addImage(obstacle2image)
      break ;
      
       case 3 : obstacle1.addImage(obstacle3image)
      break ;
      
       case 4 : obstacle1.addImage(obstacle4image)
      break ;
      
       case 5 : obstacle1.addImage(obstacle5image)
      break ;
      
       case 6 : obstacle1.addImage(obstacle6image)
      break ;
      
      
      
      
      
    }
 
 obstaclegroup.add(obstacle1);
  
  }
}

function reset() {
  gamestate=PLAY
obstaclegroup.destroyEach()
cloudgroup.destroyEach()
trex.addAnimation("t",trex_running);
  score=0
  gameover.visible=false
  restart.visible=false
}
