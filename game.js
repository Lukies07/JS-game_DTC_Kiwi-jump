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
  jumpForce: 11,
  velocityY: 0,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
};


let platformsLvlOne = [ 
  { x: 150, y: canvas.height - 200, width: 200, height: 200 },
  { x: 400, y: canvas.height - 50, width: 150, height: 20 },
  { x: 100, y: canvas.height - 50, width: 100, height: 20},
  { x: 200, y: canvas.height - 450, width: 100, height: 20},
  { x: 300, y: canvas.height - 750, width: 100, height: 20},
  { x: 450, y: canvas.height - 250, width: 100, height: 20},
  { x: 600, y: canvas.height - 100, width: 100, height: 20},
  { x: 700, y: canvas.height - 200, width: 100, height: 20},
  { x: 800, y: canvas.height - 300, width: 100, height: 20},
  { x: 900, y: canvas.height - 500, width: 100, height: 20},
  { x: 1000, y: canvas.height - 700, width: 100, height: 20},
  { x: 1100, y: canvas.height - 450, width: 100, height: 20},
  { x: 100, y: canvas.height - 350, width: 100, height: 20},
  { x: 300, y: canvas.height - 300, width: 100, height: 20},
  { x: 500, y: canvas.height - 650, width: 100, height: 20},
  { x: 700, y: canvas.height - 800, width: 100, height: 20},
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


player.x = canvas.width/2;
player.y = canvas.height - player.height;


function startGameLvlOne() {
  platforms = platformsLvlOne;
    console.log("Game started!");
    level = 1;
    checkCondition();
    drawPlatforms(); 
    drawPlayer();
    requestAnimationFrame(gameLoop);
  }

function startGameLvlTwo() {
  platforms = platformsLvlTwo;
    console.log("Game started!");
    level = 2;
    checkCondition();
    drawPlatforms(); 
    drawPlayer();
    requestAnimationFrame(gameLoop);
  }
  
function startGameLvlThree() {
  platforms = platformsLvlThree;
    console.log("Game started!");
    level = 3;
    checkCondition();
    drawPlatforms(); 
    drawPlayer(); 
    requestAnimationFrame(gameLoop);
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
  console.log("Key down:", event.key);
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
  console.log("Key up:", event.key);
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
  if ((keys["w"] || keys["ArrowUp"]) && !player.isJumping && player.y === canvas.height - player.height) {
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


function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  console.log(player.y)
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
      } else if (fromBottom < fromTop && fromBottom < fromLeft && fromBottom < fromRight) {
        // Collision from the bottom, move the player back up
        player.y = platform.y + platform.height;
        player.velocityY = 0;
      } else if (fromLeft < fromTop && fromLeft < fromBottom && fromLeft < fromRight) {
        // Collision from the left, move the player back to the right
        player.x = platform.x - player.width;
      } else if (fromRight < fromTop && fromRight < fromBottom && fromRight < fromLeft) {
        // Collision from the right, move the player back to the left
        player.x = platform.x + platform.width;
      }
    }
  }
}

function playerUpdate() {
  const gravity = 0.5;

  if (!player.isJumping) {
    // Apply a smaller gravity when the player is gliding off a platform
    player.velocityY += gravity;
  } else {
    // Apply regular gravity when jumping
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
}
function gameLoop() {
    if (level >= 1) {// if it is 0 it puts it to main menu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    handleKeys(); 
    playerUpdate();
    handleCollisions(); 
    requestAnimationFrame(gameLoop);
    }
}
checkCondition(); 
gameLoop();
