var bg, bg2, bg2Img, player, start, startImg, player, playerImg, obstacle1, obstacle2, gameOver, gameOverImg,
obstacle, coin, coinImg, coinsGroup, obstaclesGroup, livesImg, playAgain, playAgainImg, 
treasureBox, treasureBoxImg;
var live1, live2, live3;
var gameState = "serve";
var y=20,ground;
var score = 0;
var count = 0;


function preload(){
  bg = loadImage("Bg.jpg");
  player = loadImage("Player1.png");
  startImg = loadImage("play button.jpg");
  bg2Img = loadImage("Bg2.png");
  playerImg = loadImage("Player1.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  coinImg = loadImage("coin.png");
  livesImg = loadImage("lives.png");
  gameOverImg = loadImage("GameOver.png");
  playAgainImg = loadImage("PlayAgain.jpg");
  treasureBoxImg = loadImage("treasureBox.png");
}


function setup() {
  createCanvas(800,400);

  coinsGroup = new Group();
  obstaclesGroup = new Group();

  start = createSprite(400,200);
  start.addImage("starting", startImg);
  start.scale = 0.4

  gameOver = createSprite()

  bg2 = createSprite(400,200);
  bg2.velocityX=-3;
  bg2.scale = 1;
   bg2.addImage(bg2Img);

   player = createSprite(100,290,20,40);
  player.addImage(playerImg);
  player.scale = 0.2;
  player.debug = true;
  player.setCollider("rectangle", 0,0,200,player.height);
  
  ground=createSprite(50,350,800,20);
  ground.visible = false;

  live1 = createSprite(50,50);
  live1.addImage(livesImg);
  live1.scale = 0.05

  live2 = createSprite(75,50);
  live2.addImage(livesImg);
  live2.scale = 0.05

  live3 = createSprite(100,50);
  live3.addImage(livesImg);
  live3.scale = 0.05
}

function draw() {
  background(bg);

  if(gameState==="serve")
  {

start.visible=true;
player.visible=false;
bg2.visible=false;
  }
if(mousePressedOver(start))
{
  gameState="play";
}
if(gameState==="play")
{

  if(keyDown(UP_ARROW) && player.y>150){
    player.velocityY= -5;
  }
  
  player.velocityY = player.velocityY + 0.5;
  player.collide(ground);

  spawnObstacles();
  spawnCoins();
  start.destroy();
player.visible=true;
  bg2.visible=true;
  if(bg2.x<300)
  {
    bg2.x=400;
  }
  
 if(coinsGroup.isTouching(player)){
score = score+5;
coinsGroup.destroyEach();
 }

 if(player.isTouching(obstaclesGroup)){
count = count + 1;

switch(count){

case 1: live3.destroy();
        break;
case 2: live2.destroy();
        break;
case 3: gameState = "end";      
default: break
}
 }
}

if(gameState === "end"){
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  bg2.velocityX = 0;
  background("green");
  
}
drawSprites();
text("SCORE: " + score,700,50);
 text("LIVES", 4,50);
}

function spawnObstacles(){

  if(frameCount%80===0){

    if(y===20)
    {
    obstacle = createSprite(800,y,20,40);
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -2;
    obstacle.scale = 0.2;
    obstacle.debug = true;
    y=260;
    }
    else if(y===260)
    
    {
      obstacle = createSprite(800,y,20,40);
      obstacle.addImage(obstacle2);
      obstacle.velocityX = -2;
      obstacle.scale = 0.3;
      obstacle.debug = true;
      y=20;

    }

    obstaclesGroup.add(obstacle);

  }

}
function spawnCoins()
{
if(frameCount%200===0)
{
  coin = createSprite(800,random(120,250),20,20);
  coin.addImage(coinImg);
  coin.scale = 0.04;
  coin.velocityX = -2;

  coinsGroup.add(coin);
}

}
