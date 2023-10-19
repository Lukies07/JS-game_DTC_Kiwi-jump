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
];


function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
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

//determan player pos
player.x = canvas.width/2;
player.y = canvas.height - player.height;


document.addEventListener("keydown", function (event) {
    if (event.key === "d") {
      player.isMovingRight = true; // Start moving the player to the right
    } else if (event.key === "a") {
      player.isMovingLeft = true; // Start moving the player to the left
    } else if (event.key === "w") {
      if (!player.isJumping) {
        player.velocityY = -player.jumpForce; // Apply jump force
        player.isJumping = true;
      }
    }
  });
  
  document.addEventListener("keyup", function (event) {
    if (event.key === "d") {
      player.isMovingRight = false; // Stop moving the player
    } else if (event.key === "a") {
      player.isMovingLeft = false; // Stop moving the player
    }
  });

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}


function playerUpdate() {
  // Handle horizontal movement
  if (player.isMovingRight && player.x < canvas.width - player.width) {
    // Check for collisions with platforms in the x-direction
    let nextX = player.x + player.speed;
    let hasCollision = platformsLvlOne.some(platform => isColliding({ x: nextX, y: player.y, width: player.width, height: player.height }, platform));

    if (!hasCollision) {
      player.x = nextX;
    }
  }

  if (player.isMovingLeft && player.x > 0) {
    // Check for collisions with platforms in the x-direction
    let nextX = player.x - player.speed;
    let hasCollision = platformsLvlOne.some(platform => isColliding({ x: nextX, y: player.y, width: player.width, height: player.height }, platform));

    if (!hasCollision) {
      player.x = nextX;
    }
  }

  // Handle vertical movement
  const gravity = 0.5;
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Check for ground collision
  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
    player.velocityY = 0;
  }
}


function gameLoop() {
    if (level == 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    playerUpdate();
    requestAnimationFrame(gameLoop);
    }
   
}
checkCondition();
gameLoop();