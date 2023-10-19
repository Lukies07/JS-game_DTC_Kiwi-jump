const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;

let level = 0;
 
let player = {
  x: undefined,
  y: undefined,
  width: 40,
  height: 40,
  speed: 5,
  jumpForce: 12,
  velocityY: 0,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
};

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

let platformsLvlOne = [
  { x: 150, y: canvas.height - 20, width: 200, height: 10 },
  { x: 400, y: canvas.height - 50, width: 150, height: 10 },
];

function drawPlatforms() {
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let platform of platformsLvlOne) {
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
  }

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
    if (player.isMovingRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
      }
    
      if (player.isMovingLeft && player.x > 0) {
        player.x -= player.speed;
      }
    
      const gravity = 0.4;
      player.velocityY += gravity;
    
      player.y += player.velocityY;
    
      if (player.y >= canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
      }
    
      for (let platform of platformsLvlOne) {
        if (isColliding(player, platform) && player.velocityY > 0) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.isJumping = false;
        }
      }
    }


function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
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