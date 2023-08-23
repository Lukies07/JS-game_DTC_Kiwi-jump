const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

//branch genreation
let branchXpos = 0;
let branchYpos = 400;
let brachXwidth = 100;
let branchYwidth = 20;


// Player properties
const playerWidth = 50;
const playerHeight = 50;

//keep player inside the canvas
let playerX = canvas.width / 2 - playerWidth / 2;
const playerSpeed = 5;
const gravity = 0.75;
const jumpStrength = -20; // I have Negative value for upward movement
let groundHeight = 550;

//player jump stats
let playerY = groundHeight;
let jump = false;
let velocityY = 0;

// Arrow key state
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
//c stands for colour
const black = pixelData[0];
const pixelData = ctx.getImageData(playerX + playerWidth, playerY + playerHeight, 1, 1).data; //get data for edges around player
console.log(`Color at (${cubeX + relativeX}, ${cubeY + relativeY}): B=${cBlack}`);
    

// Event listeners for arrow key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


function keyDownHandler(event) {
    //arrow key listners
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    }    if (event.key === "ArrowUp" && !jump) {
        jump = true;
        velocityY = jumpStrength;
      }
    
}

function keyUpHandler(event) {
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    } 
        if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    }
        if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = false;
    }

}


// Update player position
function updatePlayerPosition() {
    if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
    
    
}

function checkPlayerBranchCollision() {
    const leftFootPixelColor = ctx.getImageData(playerX, playerY + playerHeight, 1, 1).data;
    const rightFootPixelColor = ctx.getImageData(playerX + playerWidth, playerY + playerHeight, 1, 1).data;
    
    // Check if the player's feet hit the branch's color (assuming black is the branch color)
    if (
      (leftFootPixelColor[0] === 0 && leftFootPixelColor[1] === 0 && leftFootPixelColor[2] === 0) ||
      (rightFootPixelColor[0] === 0 && rightFootPixelColor[1] === 0 && rightFootPixelColor[2] === 0)
    ) {
      // Handle collision with branch (e.g., stop player's vertical movement)
      velocityY = 0; // Stop player's vertical movement
      playerY = branchYpos - playerHeight; // Move player above the branch
      jump = false; // Allow player to jump again
    }
  }
  
  // Update function
  function update() {
    velocityY += gravity;
    playerY += velocityY;
  
    if (playerY >= groundHeight) {
      playerY = groundHeight;
      velocityY = 0;
      jump = false;
    }
  
    // Check for collisions with branch
    checkPlayerBranchCollision();
  }

  
function update() {
    // Apply gravity to the player's vertical velocity
    velocityY += gravity;
    
    // Update player's Y position based on velocity
    playerY += velocityY;
    
    // Check if the player has hit the ground
    if (playerY >= groundHeight) {
      playerY = groundHeight;
      velocityY = 0;
      jump = false;
    }
    
    // Update player's position on the screen
    // Here you might update the player's position in your game's rendering system
  }

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    updatePlayerPosition();//runs the function to update player 

    //make sticks for player to jump on
    ctx.fillStyle = "black";
    ctx.fillRect(branchXpos, branchYpos,brachXwidth, branchYwidth);

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    update(); //for the jumping
    requestAnimationFrame(gameLoop);
}

gameLoop();
