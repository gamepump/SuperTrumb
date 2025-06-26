const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;

const player = {
  x: 100,
  y: 300,
  width: 60,
  height: 80,
  ySpeed: 0,
  jumpPower: -12,
  onGround: false,
  sprite: new Image()
};

// Make sure to upload your player image to assets/images/player.png
player.sprite.src = "assets/images/player.png";

function drawPlayer() {
  ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
}

function update() {
  player.ySpeed += gravity;
  player.y += player.ySpeed;

  // Floor collision
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.ySpeed = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

function jump() {
  if (player.onGround) {
    player.ySpeed = player.jumpPower;
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

// Start the game only when the sprite image loads
player.sprite.onload = () => {
  gameLoop();
};


