const canvas = document.getElementById("MainMenu");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1080;
canvas.height = 720;

//declare player porperties
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

// chat gpt helped with this 

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

//set player pos(it is done here because technical reasons that take a lot of words to explain :)
player.x = canvas.width/2;
player.y = canvas.height - player.height;

// Add event listeners for keydown and keyup
document.addEventListener("keydown", function(event) {
  if (event.key === 'd') {
    player.isMovingRight = true; // Start moving the player to the right
    console.log(player.x)
    console.log(player.y)

  }
  if (event.key === 'a') {
    player.isMovingLeft = true; // Start moving the player to the left
    console.log(player.x)
    console.log(player.y)
  }
  if (event.key === 'w') {
    if (!player.isJumping) {
      player.velocityY = -player.jumpForce; // Apply jump force
      player.isJumping = true;
      console.log(player.x)
      console.log(player.y)
    }
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === 'd') {
    player.isMovingRight = false; // Stop moving the player
  }
  if (event.key === 'a') {
    player.isMovingLeft = false; // Stop moving the player
  }
});

// Function to update player position
function update() {

  if (player.isMovingRight && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
                                      //it is 0 cause canvas.width-canvas.width = 0
  if (player.isMovingLeft && player.x > 0) {
    player.x -= player.speed; 
  }
  const gravity = 0.4;
  player.velocityY += gravity;

  // Update player's y position
  player.y += player.velocityY;

  // If player reaches or goes below the ground, stop jumping
  if (player.y >= canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
  }
  //chat gpt did this, but after analyising code i understand it
  for (let platform of platforms) {
    if (isColliding(player, platform) && player.velocityY > 0) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.isJumping = false;
    }
  }
}

// Function to clear the canvas and draw the player
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set player color
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "black";
  for (let platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }
}

// Game loop
function gameLoop() {
  update(); // Update player position
  draw(); // Draw the updated scene
  requestAnimationFrame(gameLoop); // Call gameLoop again for the next frame
}
// Start the game loop
gameLoop();
