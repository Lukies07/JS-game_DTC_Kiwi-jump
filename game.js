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
};

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
  { x: 600, y: canvas.height - 90, width: 50, height: 25 },

];

let portalLvlThree = {x: 0, y: canvas.height - 500, width: 40, height: 50};
 
let powerUpJumpBoostLvlThree = [
  { x: 0, y: canvas.height - 0, width: 0, height: 0 }
];

 let powerUpSpeedBoostLvlThree = [
  
];

//level 4
let platformsLvlFour = [ 
  { x: 150, y: canvas.height - 200, width: 200, height: 200 },
];

let portalLvlFour = {x: 500, y: canvas.height - 500,  width: 50, height: 50};

let powerUpJumpBoostLvlFour = [
  { x: 100, y: canvas.height - 100, width: 500, height: 500 }
];

 let powerUpSpeedBoostLvlFour = [
  
];


function startGameLvlOne() {
  resetVars();
  player.x = canvas.width/2 - player.width;
  player.y = canvas.height - player.height;
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

function startGameLvlFour() {
  resetVars();
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
  powerUpSpeedBoost = powerUpSpeedBoostLvlFour
  powerUpJumpBoost = powerUpJumpBoostLvlFour; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlFour;
  platforms = platformsLvlFour;
    console.log("Game started!");
    level = 4;
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
  };
  
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
  
  for (let _powerUpJump of powerUpJumpBoost) {
    powerUpJumpBoost.forEach ((powerUpJump, powerUpJumpIndex) => {
    if(playerCollisionPowerUp(player, powerUpJump)) {
      player.jumpForce += 1;
      powerUpJumpBoost = powerUpJumpBoost.filter((_, index) => index !== powerUpJumpIndex); //this line makes the power up dissapear after the player has collected it
      console.log(player.jumpForce)
    }
  });
 }

 for (let _powerUpSpeed of powerUpSpeedBoost) {
  powerUpSpeedBoost.forEach ((powerUpSpeed, powerUpSpeedIndex) => {
  if(playerCollisionPowerUp(player, powerUpSpeed)) {
    player.speed += 0.5;
    powerUpSpeedBoost = powerUpSpeedBoost.filter((_, index) => index !== powerUpSpeedIndex); //this line makes the power up dissapear after the player has collected it
    console.log(player.speed)
  }
});
}
 
 if (playerCollisionPortal(player, portal)) {
    console.log('player touched portal');
    touchingPortal = true;
  }
}


function playerUpdate() {

  const gravity = 0.5;

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