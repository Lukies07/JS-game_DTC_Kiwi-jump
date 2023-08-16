const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player properties
const playerWidth = 50;
const playerHeight = 50;
//keep player inside the canvas
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerSpeed = 5;

//variables for jumping
let isJumping = false
// Arrow key state
let leftPressed = false;
let rightPressed = false;
let upPressed = false;

// Event listeners for arrow key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


function keyDownHandler(event) {
    //arrow key listners
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    }   else if (event.key === "Up" || event.key === "ArrowUp"){
        upPressed = true
    }
    
}

function keyUpHandler(event) {
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    } 
        else if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    }
        else if (event.key === "Up" || event.key === "ArrowUp") {
        UpPressed = false;
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
    if (upPressed && isJumping) {
        playerY + 10;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayerPosition();

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

    requestAnimationFrame(gameLoop);
}

gameLoop();
