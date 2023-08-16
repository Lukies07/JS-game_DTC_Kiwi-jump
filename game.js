const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player properties
const playerWidth = 50;
const playerHeight = 50;
let playerX = canvas.width / 2 - playerWidth / 2;
const playerY = canvas.height - playerHeight - 10;
const playerSpeed = 5;

// Arrow key state
let leftPressed = false;
let rightPressed = false;

// Event listeners for arrow key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    } else if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
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
