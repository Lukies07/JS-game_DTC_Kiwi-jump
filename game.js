const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1080;
canvas.height = 720;

let player = {
  x: canvas.width/2,
  y: player.height - canvas.height,
  width: 40,
  height: 40
};

document.addEventListener("keydown", function(event) {

  console.log("Key pressed:", event.key);
      
      if (event.key === 'd') {
    player.x += 5; 
   
  }
      if (event.key === 'a') {
    player.x -= 5;
      }

draw(); 
});

// Function to clear the canvas and draw the player
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set player color
  ctx.fillStyle = "blue";

  // Draw the player
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Initial drawing
draw();
