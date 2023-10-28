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

let portalLvlOne = {x: 1040, y: canvas.height - 500,  width: 40, height: 50};

let powerUpJumpBoostLvlOne = [
  { x: 55, y: canvas.height - 175,  width: 25, height: 25 },
];

let portalLvlTwo = {x: 500, y: canvas.height - 500,  width: 50, height: 20};

let powerUpJumpBoostLvlTwo = [
  { x: 100, y: canvas.height - 100, width: 500, height: 500 }
 ];


let portalLvlThree = {x: 500, y: canvas.height - 500, width: 50, height: 50};
 
let powerUpJumpBoostLvlThree = [
  { x: 100, y: canvas.height - 100, width: 500, height: 500 }
 ];


let portalLvlFour = {x: 500, y: canvas.height - 500,  width: 50, height: 50};

let powerUpJumpBoostLvl_Four = [
  { x: 100, y: canvas.height - 100, width: 500, height: 500 }
 ];


let portalLvlFive = {x: 500, y: canvas.height - 500, width: 50, height: 50};
 
let powerUpJumpBoostLvlFive = [
  { x: 100, y: canvas.height - 100, width: 500, height: 500 }
 ];


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


let platformsLvlTwo = [ 
  { x: 150, y: canvas.height - 200, width: 50, height: 200 },
  { x: 450, y: canvas.height - 250, width: 50, height: 100 },
  { x: 350, y: canvas.height - 200, width: 100, height: 20 },
  { x: 0, y: canvas.height - 300, width: 1000, height: 20 },
];

let platformsLvlThree = [ 
  { x: 150, y: canvas.height - 200, width: 200, height: 200 },
];

let platformsLvlFour = [ 
  { x: 150, y: canvas.height - 200, width: 200, height: 200 },
];

let platformsLvlFive = [ 
  { x: 500, y: canvas.height - 500, width: 200, height: 200 },
];

function startGameLvlOne() {
  resetVars();
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
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
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
  powerUpJumpBoost = powerUpJumpBoostLvlTwo; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlTwo;
  platforms = platformsLvlTwo;
    console.log("Game started!");
    level = 2;
    checkCondition();
    drawPlatforms(); 
    drawPlayer();
    requestAnimationFrame(gameLoop);
}
  
function startGameLvlThree() {
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
  powerUpJumpBoost = powerUpJumpBoostLvlThree; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlThree;
  platforms = platformsLvlThree;
    console.log("Game started!");
    level = 3;
    checkCondition();
    drawPlatforms(); 
    drawPlayer(); 
    requestAnimationFrame(gameLoop);
}

function startGameLvlFour() {
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
  powerUpJumpBoost = powerUpJumpBoostLvlFour; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlFour;
  platforms = platformsLvlFour;
    console.log("Game started!");
    level = 4;
    checkCondition();
    drawPlatforms(); 
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

function startGameLvlFive() {
  player.x = canvas.width/2;
  player.y = canvas.height - player.height;
  powerUpJumpBoost = powerUpJumpBoostLvlFive; //setting it equal to its respective level makes it so i dont have to make seperate functions for all levels
  portal = portalLvlFive;
  platforms = platformsLvlFive;
    console.log("Game started!");
    level = 5;
    checkCondition();
    drawPlatforms(); 
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
  
  portalLvlOne = {x: 1040, y: canvas.height - 500,  width: 40, height: 50};
  
  powerUpJumpBoostLvlOne = [
    { x: 55, y: canvas.height - 175,  width: 25, height: 25 },
  ];
  
  portalLvlTwo = {x: 500, y: canvas.height - 500,  width: 50, height: 20};
  
  powerUpJumpBoostLvlTwo = [
    { x: 100, y: canvas.height - 100, width: 500, height: 500 }
   ];
  
  
  portalLvlThree = {x: 500, y: canvas.height - 500, width: 50, height: 50};
   
  powerUpJumpBoostLvlThree = [
    { x: 100, y: canvas.height - 100, width: 500, height: 500 }
   ];
  
  
  portalLvlFour = {x: 500, y: canvas.height - 500,  width: 50, height: 50};
  
  powerUpJumpBoostLvl_Four = [
    { x: 100, y: canvas.height - 100, width: 500, height: 500 }
   ];
  
  
  portalLvlFive = {x: 500, y: canvas.height - 500, width: 50, height: 50};
   
  powerUpJumpBoostLvlFive = [
    { x: 100, y: canvas.height - 100, width: 500, height: 500 }
   ];
  
  
  platformsLvlOne = [ 
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
  
  
  platformsLvlTwo = [ 
    { x: 150, y: canvas.height - 200, width: 50, height: 200 },
    { x: 450, y: canvas.height - 250, width: 50, height: 100 },
    { x: 350, y: canvas.height - 200, width: 100, height: 20 },
    { x: 0, y: canvas.height - 300, width: 1000, height: 20 },
  ];
  
  platformsLvlThree = [ 
    { x: 150, y: canvas.height - 200, width: 200, height: 200 },
  ];
  
  platformsLvlFour = [ 
    { x: 150, y: canvas.height - 200, width: 200, height: 200 },
  ];
  
  platformsLvlFive = [ 
    { x: 500, y: canvas.height - 500, width: 200, height: 200 },
  ];
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
  for (let powerUp of powerUpJumpBoost) {
    ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
  }
}

function drawPortal() {
  ctx.fillStyle = 'purple';
  ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
}


function drawPlayer() {
  player.alpha = playerAlpha;
  console.log("Player Alpha:", player.alpha);
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
  
  for (let powerUp of powerUpJumpBoost) {
    powerUpJumpBoost.forEach ((powerUp, powerUpIndex) => {
    if(playerCollisionPowerUp(player, powerUp)) {
      player.jumpForce += 1;
      powerUpJumpBoost = powerUpJumpBoost.filter((_, index) => index !== powerUpIndex); //this line makes the power up dissapear after the player has collected it
      console.log(player.jumpForce)
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
    drawPortal();
    drawPlayer();
    handleKeys(); 
    playerUpdate();
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();