const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;

let level = 0;

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
  alpha: 1.0,
  hasKiwiSpirit: false
};

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

let kiwiSpiritLvlOne = {x: 0, y:canvas.height - 25, width: 25, height: 25}; 

let portalLvlOne = {x: 1040, y: canvas.height - 500,  width: 40, height: 50};

let powerUpJumpBoostLvlOne = [
  { x: 55, y: canvas.height - 175,  width: 25, height: 25 },
];
let powerUpSpeedBoostLvlOne = [
  
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

let kiwiSpiritLvlTwo = { x: 275, y: canvas.height -175, width: 25, height: 25 }; 

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
  { x: 0, y: canvas.height - 750, width: 1080, height: 30 }, //the roof to make the player hits its head when it tries to escape canvas
  { x: 450, y: canvas.height - 90, width: 50, height: 25 }, //first floating platform the one with the power up on it 
  { x: 450, y: canvas.height - 180, width: 50, height: 25 }, //second platform, the one above the first platform
  { x: 450, y: canvas.height - 270, width: 50, height: 25 }, //third platform above the second platform
  { x: 450, y: canvas.height - 360, width: 50, height: 25 }, //fourth platform above the second platform
  { x: 570, y: canvas.height - 430, width: 25, height: 430 }, //tall wall on the right of where the player spawns

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

  { x: 915, y: canvas.height - 390, width: 15, height: 160 }, //the stick that the player has to do a head hitter jump to get over
  { x: 715, y: canvas.height - 375, width: 150, height: 15 }, //the long platform under the jump boost
  { x: 865, y: canvas.height - 425, width: 15, height: 65, }, //the wall blocking player from just easily getting the jump boost
  { x: 770, y: canvas.height - 335, width: 145, height: 15 }, //the seconds platform slightly shorter than the one under the jump boost and is lower down
  { x: 715, y: canvas.height - 295, width: 175, height: 15 }, //the platform that goes to the left from the wall(of the line underneath)
  { x: 730, y: canvas.height - 360, width: 15, height: 65 }, //the wall that is on the right if u were going up to get the jump boost
  { x: 840, y: canvas.height - 255, width: 15, height: 40 }, //first tiny pole to jump over
  { x: 780, y: canvas.height - 255, width: 15, height: 40 }, //Second tiny pole to jump over
  { x: 675, y: canvas.height - 335, width: 25, height: 15 }, //the tiny platform on the right of the left wall of the box

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

  { x: 200, y: canvas.height - 720, width: 25, height: 75}, //the top wall on the left of the maze
  { x: 200, y: canvas.height - 620, width: 25, height: 125}, //the bottom wall on the left of the maze
  { x: 225, y: canvas.height - 720, width: 25, height: 75}, //the 3 block tall stick, stuck on the left side of maze
  { x: 300, y: canvas.height - 720, width: 125, height: 25}, //the platform that is 3 blocks from maze entrance
  { x: 275, y: canvas.height - 695, width: 50, height: 25}, //the platform one down and one back to the platform on the prev line
  { x: 225, y: canvas.height - 620, width: 100, height: 25}, //the platorm that the player walks on first when entering the maze
  { x: 275, y: canvas.height - 645, width: 50, height: 25}, //the 2 wide platform that is 3 blocks after entrance and 1 up
  { x: 300, y: canvas.height - 595, width: 25, height: 25}, //the 1x1 under the first platform that the player walks on
  { x: 350, y: canvas.height - 670, width: 25, height: 100}, //the 4 block long wall going down


];

let kiwiSpiritLvlThree = { x: 300, y: canvas.height - 25, width: 25, height: 25 }; //{ x: 1055, y: canvas.height - 330, width: 25, height: 25 };

let portalLvlThree = {x: 1040, y: canvas.height - 720, width: 40, height: 50};
 
let powerUpJumpBoostLvlThree = [
  { x: 325, y: canvas.height - 25, width: 25, height: 25 }, //{ x: 450, y: canvas.height - 115, width: 25, height: 25 }, //above the first platform
  { x: 350, y: canvas.height - 25, width: 25, height: 25 },//{ x: 595, y: canvas.height - 25, width: 25, height: 25 }, //under the platform to get up
  { x: 375, y: canvas.height - 25, width: 25, height: 25 },//{ x: 1000, y: canvas.height - 380, width: 25, height: 25 }, // the one after doing the 3 head hitters
  { x: 400, y: canvas.height - 25, width: 25, height: 25 },//{ x: 840, y: canvas.height - 400, width: 25, height: 25 }, // the one in the box in the right side of the canvas
];

 let powerUpSpeedBoostLvlThree = [
  { x: 425, y: canvas.height - 25, width: 25, height: 25 }, //{ x: 1055, y: canvas.height - 425, width: 25, height: 25 }, //the one after doing the 3 head hitters
  { x: 450, y: canvas.height - 25, width: 25, height: 25 }, //{ x: 1055, y: canvas.height - 475, width: 25, height: 25 }, //the one above the box's roof
];

function startGameLvlOne() {
  resetVars();
  player.x = canvas.width/2 - player.width;
  player.y = canvas.height - player.height;
  kiwiSpirit = kiwiSpiritLvlOne
  powerUpSpeedBoost = powerUpSpeedBoostLvlOne
  powerUpJumpBoost = powerUpJumpBoostLvlOne; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlOne;
  platforms = platformsLvlOne;
    console.log("Game started!");
    level = 1;
    checkCondition();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

function startGameLvlTwo() {
  resetVars();
  player.x = canvas.width/2 - player.width;
  player.y = canvas.height - player.height;
  kiwiSpirit = kiwiSpiritLvlTwo
  powerUpSpeedBoost = powerUpSpeedBoostLvlTwo
  powerUpJumpBoost = powerUpJumpBoostLvlTwo; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlTwo;
  platforms = platformsLvlTwo;
    console.log("Game started!");
    level = 2;
    checkCondition();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}
  
function startGameLvlThree() {
  resetVars();
  player.x = canvas.width/2 - player.width;
  player.y = canvas.height - player.height;
  kiwiSpirit = kiwiSpiritLvlThree;
  powerUpSpeedBoost = powerUpSpeedBoostLvlThree
  powerUpJumpBoost = powerUpJumpBoostLvlThree; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlThree;
  platforms = platformsLvlThree;
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
}

function checkCondition() {
    const titleScreen = document.getElementById("titleScreen");
  
    if (level === 0) {
      titleScreen.classList.remove("hidden");
    } else {
      titleScreen.classList.add("hidden");
    }
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

function drawPowerUpJumpBoost() {
  ctx.fillStyle = 'yellow';
  for (let powerUpJump of powerUpJumpBoost) {
    ctx.fillRect(powerUpJump.x, powerUpJump.y, powerUpJump.width, powerUpJump.height);
  }
}

function drawPowerUpSpeedBoost() {
  ctx.fillStyle = 'green';
  for (let powerUpSpeed of powerUpSpeedBoost) {
    ctx.fillRect(powerUpSpeed.x, powerUpSpeed.y, powerUpSpeed.width, powerUpSpeed.height);
  }
}

function drawPortal() {
  ctx.fillStyle = 'purple';
  ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
}

function drawKiwiSpirit() {
  if (!player.hasKiwiSpirit) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(kiwiSpirit.x, kiwiSpirit.y, kiwiSpirit.width, kiwiSpirit.height);
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

//chat gpt helped with the math for this function
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
    displayPopup("You picked up kiwi spirit!", "lime", "#00ff00");
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
}


function playerUpdate() {

  if (!player.isJumping) {
    player.velocityY += gravity;  
  } else {
    player.velocityY += gravity;
  }

  player.y += player.velocityY;

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
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();