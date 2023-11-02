const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const restartButton = document.getElementById("restartButton");
restartButton.classList.add("hidden");

const jumpBoostImage = new Image();
jumpBoostImage.src = 'jump_boost.png';

const speedBoostImage = new Image();
speedBoostImage.src = 'speed_boost.png';

const kiwiSpiritImage = new Image();
kiwiSpiritImage.src = 'kiwi_spirit.png';


restartButton.addEventListener("click", function() {
  restartGame();
});

canvas.width = 1080;
canvas.height = 720;

let level = 0;

//player propertiess
let player = {
  x: undefined,
  y: undefined, 
  width: 25,
  height: 25,
  speed: 4,
  jumpForce: 10,
  velocityY: 0,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
  isFading: false,
  fadeDuration: 2000, // 2000 milliseconds (2 seconds)
  alpha: 1.0, //transparency basically
  hasKiwiSpirit: false
};

//some variables
let currentAnimationFrame = null;
let gravity = 0.5;
let touchingPortal = false


//level 1
let platformsLvlOne = [ 
  { x: 580, y: canvas.height -180, width: 50, height: 180 }, //tall stick right
  { x: 420, y: canvas.height -80, width: 50, height: 80 }, //tall stick left
  { x: 630, y: canvas.height -80, width: 50, height: 25 }, //the little platform on the tall right stick (to help u get back up if u went too far right)
  { x: 100, y: canvas.height -150, width: 200, height: 20 }, // first platfroms player meant to jump to
  { x: 90, y: canvas.height -220, width: 50, height: 20 }, //the platfrom to jump inbetween on left side when on platform that the first player is meant to jump to
  { x: 180, y: canvas.height -220, width: 130, height: 20 }, //the platfrom to jump inbetween on right side when on platform that the first player is meant to jump to                                                
  { x: 80, y: canvas.height -220, width: 25, height: 90 }, //small wall on right side of 'first platform'
  { x: 50, y: canvas.height -150, width: 40, height: 20 }, //small platfrom that is under the powerup
  { x: 600, y: canvas.height -260, width: 50, height: 20 }, //small platfrom that the player needs to jump on to get to the portal
  { x: 660, y: canvas.height -350, width: 50, height: 20 }, //small platform above the one from the previous line of code
  { x: 790, y: canvas.height -350, width: 50, height: 20 }, //the platform that is 2 jumps behind the portal (3 gaps to the left)
  { x: 920, y: canvas.height -350, width: 50, height: 20 }, //the platform that is 1 jump behind the portal
  { x: 1040, y: canvas.height - 450,  width: 40, height: 20 } //the platform under the portal
];

let kiwiSpiritLvlOne = {x: 0, y:canvas.height - 40, width: 40, height: 40}; 

let portalLvlOne = {x: 1040, y: canvas.height - 500,  width: 40, height: 50};

let powerUpJumpBoostLvlOne = [
  { x: 55, y: canvas.height - 175,  width: 25, height: 25 },
];
let powerUpSpeedBoostLvlOne = [
  //empty cause there is none, and if i didnt have the variable/array the game would break
];

//level 2
let platformsLvlTwo = [ 
  { x: 150, y: canvas.height - 90, width: 50, height: 90 }, //bottom stick on the left that player has to jump on
  { x: 150, y: canvas.height - 200, width: 50, height: 60 }, //the one above the first stick on the left
  { x: 150, y: canvas.height - 330, width: 225, height: 90 }, //the platform that acts as a roof
  { x: 200, y: canvas.height -200, width: 200, height: 25 }, //the platform that is like the ground once player has got the jump boost and then jumped on top of this platform
  { x: 350, y: canvas.height -150, width: 50, height: 25 }, //the platform under the JumpBoostPowerUp
  { x: 350, y: canvas.height -175, width: 25, height: 25 }, //the back wall for the power up
  { x: 550, y: canvas.height -330, width: 50, height: 305 }, //tall stick on the right of player spawnpoint
  { x: 860, y: canvas.height -180, width: 150, height: 25 }, //platfrom to get to the portal the portal
  { x: 1005, y: canvas.height -320, width: 75, height: 25 }, //platform under the portal
];

let kiwiSpiritLvlTwo = { x: 285, y: canvas.height -175, width: 40, height: 40 }; 

let portalLvlTwo = { x: 1040, y: canvas.height -370, width: 40, height: 50 };

let powerUpJumpBoostLvlTwo = [
  { x: 0, y: canvas.height - 210, width: 25, height: 25 },
  { x: 375, y: canvas.height -175, width: 25, height: 25 },
];
 
let powerUpSpeedBoostLvlTwo = [
  {x: 0, y: canvas.height - 500, width: 25, height: 25},
]

//level 3
let platformsLvlThree = [

  //main platforms
  { x: 0, y: canvas.height - 750, width: 1080, height: 30 }, //the roof to make the player hits its head when it tries to escape canvas
  { x: 450, y: canvas.height - 90, width: 50, height: 25 }, //first floating platform the one with the power up on it 
  { x: 450, y: canvas.height - 180, width: 50, height: 25 }, //second platform, the one above the first platform
  { x: 450, y: canvas.height - 270, width: 50, height: 25 }, //third platform above the second platform
  { x: 450, y: canvas.height - 360, width: 50, height: 25 }, //fourth platform above the second platform
  { x: 570, y: canvas.height - 430, width: 25, height: 430 }, //tall wall on the right of where the player spawns

  //the left side bottom platfroms
  { x: 595, y: canvas.height - 75, width: 50, height: 25 }, //platform to help player get back up
  { x: 650, y: canvas.height - 150, width: 50, height: 25 }, //first head hitterplatform
  { x: 765, y: canvas.height - 150, width: 50, height: 25 }, //second head hitterplatform
  { x: 880, y: canvas.height - 150, width: 50, height: 25 }, //third head hitterplatform
  { x: 995, y: canvas.height - 150, width: 50, height: 25 }, //fourth head hitterplatform (platform on right side of roof of head hitter )
  { x: 975, y: canvas.height - 345, width: 25, height: 140 }, //wall on right side of roof of head hitter 
  { x: 975, y: canvas.height - 425, width: 25, height: 40 }, //the floating wall that make a hole between itself and the wall on the right side of head hitter roof 
  { x: 650, y: canvas.height - 450, width: 25, height: 220 }, //wall on left side of the head hitter roof
  { x: 650, y: canvas.height - 230, width: 350, height: 25 }, //platform above the three jumps to the right (the roof for the head hitter jump)
  { x: 1030, y: canvas.height - 230, width: 50, height: 25 }, //platform with jump boost and speed boost above it 
  { x: 675, y: canvas.height - 450, width: 410, height: 25 }, //the roof for the box on the right side of canvas
  { x: 1030, y: canvas.height - 425, width: 15, height: 75 }, //the floating wall that stops the player from getting speed boost
  { x: 625, y: canvas.height - 300, width: 25, height: 15 }, // the small platform that the player uses to get back upover the tall stick on the right side of where the player spawns 

  //the box on the right side of canvas
  { x: 915, y: canvas.height - 390, width: 15, height: 160 }, //the stick that the player has to do a head hitter jump to get over
  { x: 715, y: canvas.height - 375, width: 150, height: 15 }, //the long platform under the jump boost
  { x: 865, y: canvas.height - 425, width: 15, height: 65, }, //the wall blocking player from just easily getting the jump boost
  { x: 770, y: canvas.height - 335, width: 145, height: 15 }, //the seconds platform slightly shorter than the one under the jump boost and is lower down
  { x: 715, y: canvas.height - 295, width: 175, height: 15 }, //the platform that goes to the left from the wall(of the line underneath)
  { x: 730, y: canvas.height - 360, width: 15, height: 65 }, //the wall that is on the right if u were going up to get the jump boost
  { x: 840, y: canvas.height - 255, width: 15, height: 40 }, //first tiny pole to jump over
  { x: 780, y: canvas.height - 255, width: 15, height: 40 }, //Second tiny pole to jump over
  { x: 675, y: canvas.height - 335, width: 25, height: 15 }, //the tiny platform on the right of the left wall of the box

  //the left sode of canvas
  { x: 230, y: canvas.height - 475, width: 25, height: 225 }, // the top wall on the left that the player has to go through
  { x: 230, y: canvas.height - 200, width: 25, height: 200 }, //the bottom wal on the left that the player has to jump through
  { x: 255, y: canvas.height - 382, width: 125, height: 55 }, //the platform stopping player from easily getting thru gap on the left side
  { x: 425, y: canvas.height - 180, width: 25, height: 115 }, //the wall that stops player from getting throught the gap from the first platform
  { x: 175, y: canvas.height - 250, width: 25, height: 200 }, //the wall that makes the player go down as
  { x: 175, y: canvas.height - 275, width: 55, height: 25 }, //the tiny roof above the wall that forces the player to go all the way down
  { x: 125, y: canvas.height - 25, width: 80, height: 25 }, //the lowest platform in the rectangle on the left  
  { x: 0, y: canvas.height - 100, width: 25, height: 25 }, //first tiny square
  { x: 42, y: canvas.height - 325, width: 25, height: 25 }, //second tiny square
  { x: 50, y: canvas.height - 410, width: 120, height: 25 }, //roof that the player has to hit to get onto second small square
  { x: 145, y: canvas.height - 650, width: 25, height: 240 }, //the wall on the right side of the head hitter
  { x: 0, y: canvas.height - 580, width: 70, height: 25 }, //the first of the 2 platforms that the player has to go through
  { x: 100, y: canvas.height - 580, width: 45, height: 25 }, //the second of the 2 platforms that the player has to go through
  { x: 170, y: canvas.height - 495, width: 910, height: 20 }, //the long roof that stops player from easily getting to the second part of the level

  //the maze
  { x: 200, y: canvas.height - 720, width: 25, height: 75}, //the top wall on the left of the maze
  { x: 200, y: canvas.height - 620, width: 25, height: 125}, //the bottom wall on the left of the maze
  { x: 225, y: canvas.height - 720, width: 25, height: 75}, //the 3 block tall stick, stuck on the left side of maze
  { x: 300, y: canvas.height - 720, width: 150, height: 25}, //the platform that is 3 blocks from maze entrance
  { x: 275, y: canvas.height - 695, width: 50, height: 25}, //the platform one down and one back to the platform on the prev line
  { x: 225, y: canvas.height - 620, width: 100, height: 25}, //the platorm that the player walks on first when entering the maze
  { x: 275, y: canvas.height - 645, width: 50, height: 25}, //the 2 wide platform that is 3 blocks after entrance and 1 up
  { x: 300, y: canvas.height - 595, width: 25, height: 25}, //the 1x1 under the first platform that the player walks on
  { x: 350, y: canvas.height - 670, width: 25, height: 100}, //the 4 block long wall going down
  { x: 400, y: canvas.height - 695, width: 25, height: 100}, //the 4 block wall going down, 2 blocks ahead and 1 up from the prev line
  { x: 425, y: canvas.height - 620, width: 50, height: 25}, //the 2 block long plaform extending off the wall from the prev line
  { x: 350, y: canvas.height - 570, width: 125, height: 25}, //the 5 block long pipe on the bottom of the 4 bblock tall wall
  { x: 250, y: canvas.height - 545, width: 150, height: 25}, //im getting tired of describing these platforms
  { x: 475, y: canvas.height - 595, width: 50, height: 75}, //2x3 rectangle
  { x: 450, y: canvas.height - 595, width: 25, height: 25}, //1x1 behind the 2x3
  { x: 250, y: canvas.height - 570, width: 25, height: 25}, //1x1 by the platform that the palyer takes to go backwards
  { x: 425, y: canvas.height - 520, width: 25, height: 25}, //1x1 at the bottom of the maze in the middle
  { x: 450, y: canvas.height - 670, width: 75, height: 25}, //1x3 platfrom near the middle top of the maze
  { x: 475, y: canvas.height - 695, width: 175, height: 25}, //1x7 long platform near top middle of maze
  { x: 500, y: canvas.height - 645, width: 25, height: 25}, //1x1 under the 2x2 looking are formed by the pervious lines
  { x: 550, y: canvas.height - 645, width: 25, height: 25}, //1x1 before the 2 tall walls going downwards
  { x: 575, y: canvas.height - 645, width: 25, height: 100}, //1x4 going down further one
  { x: 550, y: canvas.height - 595, width: 25, height: 100}, //1x4 going down closer one
  { x: 625, y: canvas.height - 670, width: 50, height: 25}, //2x1
  { x: 675, y: canvas.height - 695, width: 25, height: 100}, //1x4 going down after the 2
  { x: 625, y: canvas.height - 620, width: 50, height: 25}, //2x1 that is slightly lower
  { x: 625, y: canvas.height - 595, width: 25, height: 100}, //1x4 going down to the ground
  { x: 600, y: canvas.height - 520, width: 25, height: 25}, //the 1x1 one before the previous line (is on the ground)
  { x: 650, y: canvas.height - 570, width: 25, height: 25}, //first of the 3 1x1s that make an upside down triangle
  { x: 675, y: canvas.height - 520, width: 25, height: 25}, //second of the 3 1x1s that make an upside down triangle
  { x: 700, y: canvas.height - 570, width: 25, height: 25}, //third of the 3 1x1s  that make an upside down triangle
  { x: 725, y: canvas.height - 695, width: 25, height: 175}, //first 1x7 going from 1 under the roof, near end of maze
  { x: 775, y: canvas.height - 695, width: 25, height: 175}, //second 1x7 going from 1 under the roof, near end of maze
  { x: 750, y: canvas.height - 545, width: 25, height: 25}, //small platform inbtween the 2 1x7s
  { x: 800, y: canvas.height - 720, width: 25, height: 50}, //the small 1x2 hanging from roof
  { x: 825, y: canvas.height - 645, width: 25, height: 150}, //the 1x6 going to the ground
  { x: 850, y: canvas.height - 695, width: 25, height: 75}, //the first 1x3 going down
  { x: 875, y: canvas.height - 695, width: 50, height: 25}, //the 1x2 going right
  { x: 900, y: canvas.height - 645, width: 25, height: 75}, //the second 1x3 going down
  { x: 875, y: canvas.height - 595, width: 25, height: 75}, //third 1x3 going down (this one is more to the left but lower down the the on on the prev line)
  { x: 900, y: canvas.height - 545, width: 75, height: 25}, //3x1 going left 
  { x: 950, y: canvas.height - 695, width: 25, height: 150}, //1x6 going down
  { x: 975, y: canvas.height - 695, width: 50, height: 25}, //2x1 goiing to the wall on the right of maze
  { x: 1000, y: canvas.height - 645, width: 25, height: 25}, //1x1 on right wall
  { x: 1000, y: canvas.height - 595, width: 25, height: 100}, //the 1x4 going down (on the right wall)
  { x: 1025, y: canvas.height - 720, width: 25, height: 50}, //top section of right wall
  { x: 1025, y: canvas.height - 645, width: 15, height: 150}, //bottom section of right wall
];

let kiwiSpiritLvlThree = { x: 1030, y: canvas.height - 350, width: 40, height: 40 };

let portalLvlThree = {x: 1040, y: canvas.height - 545, width: 40, height: 50};
 
let powerUpJumpBoostLvlThree = [
  { x: 450, y: canvas.height - 115, width: 25, height: 25 }, //above the first platform
  { x: 595, y: canvas.height - 25, width: 25, height: 25 }, //under the platform to get up
  { x: 1000, y: canvas.height - 380, width: 25, height: 25 }, // the one after doing the 3 head hitters
  { x: 840, y: canvas.height - 400, width: 25, height: 25 }, // the one in the box in the right side of the canvas
]

 let powerUpSpeedBoostLvlThree = [
  { x: 1055, y: canvas.height - 425, width: 25, height: 25 }, //the one after doing the 3 head hitters
  { x: 1055, y: canvas.height - 475, width: 25, height: 25 }, //the one above the box's roof
];

function startGameLvlOne() {
  restartButton.classList.remove("hidden"); //make restart button a appear by removing the hidden clas
  showGameInfo();
  resetVars();
  player.x = canvas.width/2 - player.width; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  player.y = canvas.height - player.height; //same goes for this one
  kiwiSpirit = kiwiSpiritLvlOne //same goes for this one
  powerUpSpeedBoost = powerUpSpeedBoostLvlOne //same goes for this one
  powerUpJumpBoost = powerUpJumpBoostLvlOne;  //same goes for this one
  portal = portalLvlOne; //same goes for this one
  platforms = platformsLvlOne; //same goes for this one
    console.log("Game started!");
    level = 1;
    checkCondition();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

function startGameLvlTwo() {
  restartButton.classList.remove("hidden"); //make restart button a appear by removing the hidden clas
  showGameInfo();
  resetVars();
  player.x = canvas.width/2 - player.width; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  player.y = canvas.height - player.height; //same goes for this one
  kiwiSpirit = kiwiSpiritLvlTwo //same goes for this one
  powerUpSpeedBoost = powerUpSpeedBoostLvlTwo //same goes for this one
  powerUpJumpBoost = powerUpJumpBoostLvlTwo; //same goes for this one
  portal = portalLvlTwo; //same goes for this one
  platforms = platformsLvlTwo; //same goes for this one
    console.log("Game started!");
    level = 2;
    checkCondition();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}
  
function startGameLvlThree() {
  restartButton.classList.remove("hidden"); //make restart button a appear by removing the hidden clas
  showGameInfo();
  resetVars();
  player.x = canvas.width/2 - player.width; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  player.y = canvas.height - player.height; //same goes for this one
  kiwiSpirit = kiwiSpiritLvlThree; //same goes for this one
  powerUpSpeedBoost = powerUpSpeedBoostLvlThree //same goes for this one
  powerUpJumpBoost = powerUpJumpBoostLvlThree; //same goes for this one
  portal = portalLvlThree; //same goes for this one
  platforms = platformsLvlThree; //same goes for this one
    console.log("Game started!");
    level = 3;
    checkCondition();
    drawPlayer(); 
    requestAnimationFrame(gameLoop);
}

//reset all player stats, canvas and other stuff
function resetVars() {
  player = {
    x: undefined,
    y: undefined, 
    width: 25,
    height: 25,
    speed: 4,
    jumpForce: 10,
    velocityY: 0,
    isJumping: false,
    isMovingLeft: false,
    isMovingRight: false,
    isFading: false,
    fadeDuration: 2000, // 2000 milliseconds (2 seconds)
    alpha: 1.0,
    hasKiwiSpirit: false
  };

  gravity = 0.5;
  touchingPortal = false;
  playerAlpha = 1.0;
  
  console.log('reset vars')
  ctx.clearRect(0, 0, canvas.width, canvas.height);
} //end of reset vars function


function checkCondition() {
    const titleScreen = document.getElementById("titleScreen");
  
    if (level === 0) {
      titleScreen.classList.remove("hidden");
    } else {
      titleScreen.classList.add("hidden");
    }
}

function showGameInfo() {
  const gameInfoContainer = document.getElementById("gameInfoContainer");
  gameInfoContainer.style.display = "flex";
}

function MainMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let keys = {};

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function handleKeys() {
  if (keys["d"] || keys["ArrowRight"]) {
      player.isMovingRight = true;
  } else {
      player.isMovingRight = false;
  }

  if (keys["a"] || keys["ArrowLeft"]) {
      player.isMovingLeft = true;
  } else {
      player.isMovingLeft = false;
  }
  if ((keys["w"] || keys["ArrowUp"]) && !player.isJumping && (player.y >= canvas.height - player.height || isOnPlatform())) {
    player.velocityY = -player.jumpForce;
    player.isJumping = true;
  }
}

function restartGame() {
  cancelAnimationFrame(currentAnimationFrame); // Cancel the current animation frame
  if (level === 1) {
    startGameLvlOne();
  } else if (level === 2) {
    startGameLvlTwo();
  } else if (level === 3) {
    startGameLvlThree();
  }
}

//the following functions check for collisions and then when collision is true an action can be done
function playerCollision(player, platform) {
  return (
    player.x < platform.x + platform.width &&
    player.x + player.width > platform.x &&
    player.y < platform.y + platform.height &&
    player.y + player.height > platform.y
  );
}

function playerCollisionPowerUp(player, powerUpJumpBoost) {
  return (
    player.x < powerUpJumpBoost.x + powerUpJumpBoost.width &&
    player.x + player.width > powerUpJumpBoost.x &&
    player.y < powerUpJumpBoost.y + powerUpJumpBoost.height &&
    player.y + player.height > powerUpJumpBoost.y
  );
}

function playerCollisionPortal(player, portal) {
  return (
    player.x < portal.x + portal.width &&
    player.x + player.width > portal.x &&
    player.y < portal.y + portal.height &&
    player.y + player.height > portal.y
  );
}

function playerCollisionKiwiSpirit(player, kiwiSpirit) {
  return (
    player.x < kiwiSpirit.x + kiwiSpirit.width &&
    player.x + player.width > kiwiSpirit.x &&
    player.y < kiwiSpirit.y + kiwiSpirit.height &&
    player.y + player.height > kiwiSpirit.y
  );
}

function isOnPlatform() {
  for (let platform of platforms) {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height === platform.y
    ) {
      return true;
    }
  }
  return false;
}

//all the drawing functions
function drawPowerUpJumpBoost() {
  for (let powerUpJump of powerUpJumpBoost) {
    powerUpJump.alpha = powerUpJump.Alpha;
    ctx.globalAlpha = powerUpJump.alpha;
    ctx.drawImage (jumpBoostImage, powerUpJump.x, powerUpJump.y, powerUpJump.width, powerUpJump.height);
  }
}

function drawPowerUpSpeedBoost() {
  for (let powerUpSpeed of powerUpSpeedBoost) {
    powerUpSpeed.alpha = powerUpSpeed.Alpha;
    ctx.globalAlpha = powerUpSpeed.alpha;
    ctx.drawImage(speedBoostImage, powerUpSpeed.x, powerUpSpeed.y, powerUpSpeed.width, powerUpSpeed.height);
  }
}

function drawPortal() {
  ctx.fillStyle = 'purple';
  ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
}

function drawKiwiSpirit() {
  if (!player.hasKiwiSpirit) {
    kiwiSpirit.alpha = kiwiSpirit.Alpha;

    //chat gpt helped me with getting rounded edges
    const kiwiSpiritRadius = 10;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(kiwiSpirit.x + kiwiSpiritRadius, kiwiSpirit.y);
    ctx.arcTo(kiwiSpirit.x + kiwiSpirit.width, kiwiSpirit.y, kiwiSpirit.x + kiwiSpirit.width, kiwiSpirit.y + kiwiSpirit.height, kiwiSpiritRadius);
    ctx.arcTo(kiwiSpirit.x + kiwiSpirit.width, kiwiSpirit.y + kiwiSpirit.height, kiwiSpirit.x, kiwiSpirit.y + kiwiSpirit.height, kiwiSpiritRadius);
    ctx.arcTo(kiwiSpirit.x, kiwiSpirit.y + kiwiSpirit.height, kiwiSpirit.x, kiwiSpirit.y, kiwiSpiritRadius);
    ctx.arcTo(kiwiSpirit.x, kiwiSpirit.y, kiwiSpirit.x + kiwiSpirit.width, kiwiSpirit.y, kiwiSpiritRadius);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(kiwiSpiritImage, kiwiSpirit.x, kiwiSpirit.y, kiwiSpirit.width, kiwiSpirit.height);
    ctx.restore();
  }
}

function drawPlayer() {
  player.alpha = playerAlpha;
  ctx.globalAlpha = player.alpha;
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  } 
}

//this is for the pop up to tel ppl that the need kiwiSpirit to pick up the powerUp
function displayPopup(message, color, kiwiSpiritColor) {
  const popup = document.getElementById("popup");
  popup.innerHTML = message;
  popup.style.backgroundColor = color;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}


//chat gpt helped with the math for this function //this funcion tests for collisions and then decides what to do when a collision is detected
function handleCollisions() {
  for (let platform of platforms) {
    if (playerCollision(player, platform)) {
      const fromTop = player.y + player.height - platform.y;
      const fromBottom = platform.y + platform.height - player.y;
      const fromLeft = player.x + player.width - platform.x;
      const fromRight = platform.x + platform.width - player.x;

      if (fromTop < fromBottom && fromTop < fromLeft && fromTop < fromRight) {
        // Collision from the top, move the player back down
        player.y = platform.y - player.height;
        player.isJumping = false;
        player.velocityY = 0;
      } 
      if (fromBottom < fromTop && fromBottom < fromLeft && fromBottom < fromRight) {
        // Collision from the bottom, move the player back up
        player.y = platform.y + platform.height;
        player.velocityY = 0;
      }
        if (fromLeft < fromTop && fromLeft < fromBottom && fromLeft < fromRight) {
        player.x = platform.x - player.width;
          } 
        if (fromRight < fromTop && fromRight < fromBottom && fromRight < fromLeft) {
        player.x = platform.x + platform.width;
      }
    }
  }
  
  if (playerCollisionKiwiSpirit(player, kiwiSpirit)) {
    console.log('Player touched kiwi spirit');
    player.hasKiwiSpirit = true;
    kiwiSpirit = {}; // Remove kiwi spirit by emptying its properties
    displayPopup("You picked up kiwi spirit!", "lime", "#00ff00");
  }

  // Check for collision with power up jump boost
  for (let _powerUpJump of powerUpJumpBoost) {
    powerUpJumpBoost.forEach((powerUpJump, powerUpJumpIndex) => {
      if (playerCollisionPowerUp(player, powerUpJump)) {
        if (player.hasKiwiSpirit) {
          displayPopup("You picked up jump boost!", "lime", "#00ff00"); 
          player.jumpForce += 1;
          powerUpJumpBoost = powerUpJumpBoost.filter((_, index) => index !== powerUpJumpIndex);
          console.log(player.jumpForce);
        } else {
          displayPopup("You need kiwi spirit to obtain a jump boost!", "#ff5100cd", "#00ff00");
        }
      }
    });
  }

  // Check for collision with power up speed boost
  for (let _powerUpSpeed of powerUpSpeedBoost) {
    powerUpSpeedBoost.forEach((powerUpSpeed, powerUpSpeedIndex) => {
      if (playerCollisionPowerUp(player, powerUpSpeed)) {
        if (player.hasKiwiSpirit) {
          displayPopup("You picked up speed boost!", "lime", "#00ff00");
          player.speed += 0.5;
          powerUpSpeedBoost = powerUpSpeedBoost.filter((_, index) => index !== powerUpSpeedIndex);
          console.log(player.speed);
        } else {
          displayPopup("You need kiwi spirit to obtain a jump boost!", "#ff5100cd", "#00ff00");
        }
      } 
    });
  }

 if (playerCollisionPortal(player, portal)) {
  console.log('player touched portal');
  touchingPortal = true;
 }
} //end of collision function


function playerUpdate() { //this just updates the player 

  if (!player.isJumping) {
    player.velocityY += gravity;  
  } else {
    player.velocityY += gravity;
  }

  player.y += player.velocityY;

  //part of the calculation for when player is jumping
  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
    player.velocityY = 0;
  }

  handleKeys();

  if (player.isMovingRight && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }

  if (player.isMovingLeft && player.x > 0) {
    player.x -= player.speed;
  }

  if(playerAlpha <= 0) {
    resetVars();
    level = 0;
    checkCondition();
    touchingPortal = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };  

  if (touchingPortal == true) {
    playerAlpha -= 0.01;
  }
}

function gameLoop() {
  checkCondition(); 
  if (level >= 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleCollisions();  
    drawPlatforms();
    drawKiwiSpirit();
    drawPowerUpJumpBoost();
    drawPowerUpSpeedBoost();
    drawPortal();
    drawPlayer();
    handleKeys(); 
    playerUpdate();
    currentAnimationFrame = requestAnimationFrame(gameLoop);
  }
}

gameLoop();