var bg, bgImg
var balloon, balloonImg
var topGround , bottomGround
var obstacle, obstacle1 , obstacle2
var obstacleBottom, obstacleB1 , obstacleB2 , obstacleB3
var gameOver, gameOverImg
var restart, restartImg
var dieSound
var jumpSound

var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY

function preload()
{
bgImg = loadImage('ASSETS/bg.png')
balloonImg = loadImage('ASSETS/balloon1.png', ' ASSETS/balloon2.png' , 'ASSETS/balloon3.png')
obstacle1 = loadImage('ASSETS/obsTop1.png')
obstacle2 = loadImage('ASSETS/obsTop2.png')
obstacleB1 = loadImage('ASSETS/obsBottom1.png')
obstacleB2 = loadImage('ASSETS/obsBottom2.png')
obstacleB3 = loadImage('ASSETS/obsBottom3.png')
gameOverImg = loadImage('ASSETS/gameOver.png')
restartImg = loadImage('ASSETS/restart.png')
dieSound = loadSound('ASSETS/die.mp3')
jumpSound = loadSound('ASSETS/jump.mp3')
}

function setup()
{
 bg = createSprite(165,485,1,1)
 bg.addImage(bgImg)
 bg.scale = 1.3

 balloon = createSprite(100,200,20,50)
 balloon.addAnimation('balloon' , balloonImg)
 balloon.scale = 0.2
balloon.depug = true


 topGround = createSprite(200,10,800,20)
 topGround.visible = false
 bottomGround = createSprite(200,390,800,20)
 bottomGround.visible = false

 topObstaclesGroup = new Group()
bottomObstaclesGroup = new Group()
barGroup = new Group()

gameOver = createSprite(220,200)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false

restart = createSprite(220,240)
restart.addImage(restartImg)
restart.scale = 0.5
restart.visible= false



}

function draw()
{
    background("black")
    if (gameState== PLAY)
    {
    if (keyDown('space'))
    {
        balloon.velocityY =-6
        jumpSound.play();

    }
   balloon.velocityY = balloon.velocityY + 2
Bar();
spawnTopObstacles();
spawnBottomObstacles();

if(topObstaclesGroup.isTouching(balloon)|| 
balloon.isTouching(topGround)|| balloon.isTouching(bottomGround)|| bottomObstaclesGroup.isTouching(balloon))
{

    gameState = END
    dieSound.play();


}}
if (gameState== END)
{
gameOver.visible = true
restart.visible = true
gameOver.depth = gameOver.depth+1
restart.depth = restart.depth+1
balloon.velocityX= 0
balloon.velocityY= 0
topObstaclesGroup.setVelocityXEach(0)
bottomObstaclesGroup.setVelocityXEach(0)
barGroup.setVelocityXEach(0)
topObstaclesGroup.setLifetimeEach(-1)
bottomObstaclesGroup.setLifetimeEach(-1)
balloon.y = 200
if(mousePressedOver(restart))
{
    Reset();

}
}

   drawSprites();
   Score();  
}
function spawnTopObstacles()
{
 if (World.frameCount% 60 == 0)
 {
    obstacle = createSprite(400,50,40,50)
    obstacle.scale = 0.1
    obstacle.velocityX = -4
    obstacle.y = Math.round(random(10,100))
    var rand=Math.round(random(1,2))
    switch(rand)
    {
        case 1 : obstacle.addImage(obstacle1)
        break;

        case 2 : obstacle.addImage(obstacle2)
        break;
        
        default:break
    }
    obstacle.lifetime= 100
    obstacle.depth = balloon.depth
    balloon.depth = balloon.depth+1
   
    topObstaclesGroup.add(obstacle)

 }
}
function spawnBottomObstacles()
{
    if (World.frameCount% 60 == 0)
    {
       obstacleBottom = createSprite(400,350,40,50)
       obstacleBottom.scale = 0.1
       obstacleBottom.velocityX = -4
       var rand=Math.round(random(1,3))
        
       switch(rand)
       {
           case 1 : obstacleBottom.addImage(obstacleB1)
           break;
   
           case 2 : obstacleBottom.addImage(obstacleB2)
           break;

           case 3 : obstacleBottom.addImage(obstacleB3)
           
           default:break
       }
       obstacleBottom.lifetime= 100
       obstacleBottom.depth = balloon.depth
       balloon.depth = balloon.depth+1
       
       bottomObstaclesGroup.add(obstacleBottom)
       
   
    }
   }
function Bar()
{
if(World.frameCount%60 == 0)
{
    var bar = createSprite(400,200,10,800)
    bar.velocityX = -6
    bar.depth = balloon .depth
    bar.depth = bar.depth+1
    bar.visible = false
    bar.lifetime = 70
    barGroup.add(bar)
    

}

}

function Reset()
{
 gameState = PLAY
 gameOver.visible = false
 restart.visible = false
 topObstaclesGroup.destroyEach()
 bottomObstaclesGroup.destroyEach()
 score = 0

}

function Score()
{
    if(balloon.isTouching(barGroup))
    {
        score = score + 1
    }
    textFont("algerian")
    textSize(30)
    fill('yellow')
    text('score:'+ score , 250 , 50)

}





