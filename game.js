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
  speed: 5,
  jumpForce: 11,
  velocityY: 0,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
};


let platformsLvlOne = [
  { x: 150, y: canvas.height - 200, width: 200, height: 200 },
  { x: 400, y: canvas.height - 50, width: 150, height: 10 },
  { x: 100, y: canvas.height - 50, width: 100, height: 20},
  { x: 200, y: canvas.height - 600, width: 100, height: 20},
  { x: 300, y: canvas.height - 750, width: 100, height: 20},
  { x: 400, y: canvas.height - 250, width: 100, height: 20},
  { x: 600, y: canvas.height - 100, width: 100, height: 20},  
  { x: 700, y: canvas.height - 200, width: 100, height: 20},
  { x: 800, y: canvas.height - 300, width: 100, height: 20},
  { x: 900, y: canvas.height - 500, width: 100, height: 20},
  { x: 1000, y: canvas.height - 700, width: 100, height: 20},
  { x: 1100, y: canvas.height - 450, width: 100, height: 20},
  { x: 100, y: canvas.height - 350, width: 100, height: 20},
  { x: 300, y: canvas.height - 400, width: 100, height: 20},
  { x: 500, y: canvas.height - 650, width: 100, height: 20},
  { x: 700, y: canvas.height - 800, width: 100, height: 20},
];


player.x = canvas.width/2;
player.y = canvas.height - player.height;


function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  console.log(player.y)
}


function drawPlatforms() {
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let platform of platformsLvlOne) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }
}


function startGame() {
    console.log("Game started!");
    level = 1;
    checkCondition();
    drawPlatforms(); // Draw the platforms
    drawPlayer(); // Draw the player
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
});

document.addEventListener("keyup", function (event) {
    keys[event.key] = false;
});

function handleKeys() {

    if (keys["d"]) {
      player.isMovingRight = true;
      console.log(player.x)
    } else {
        player.isMovingRight = false;
    }

    if (keys["a"]) {
        player.isMovingLeft = true;
        console.log(player.x)
    } else {
        player.isMovingLeft = false;
    }

    if (keys["w"] && !player.isJumping) {
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

function handleCollisions() {
  for (let i = 0; i < platformsLvlOne.length; i++) {
    if (playerCollision(player, platformsLvlOne[i])) {
      // Collision detected, handle it here
      const fromTop = player.y + player.height - platformsLvlOne[i].y;
      const fromBottom = platformsLvlOne[i].y + platformsLvlOne[i].height - player.y;

      if (fromTop < fromBottom) {
        // Collision from the top, move the player back down
        player.y = platformsLvlOne[i].y - player.height;
        player.isJumping = false;
        player.velocityY = 0;
      } else {
        // Collision from the bottom, move the player back up
        player.y = platformsLvlOne[i].y + platformsLvlOne[i].height;
        player.velocityY = 0;
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
    if (level == 1) {
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
