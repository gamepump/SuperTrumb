const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const moveSpeed = 5;

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

player.sprite.src = "assets/images/player.png";

const keys = {
  left: false,
  right: false,
  up: false
};

function drawPlayer() {
  ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
}

function update() {
  // Horizontal movement
  if (keys.left) {
    player.x -= moveSpeed;
    if (player.x < 0) player.x = 0;
  }
  if (keys.right) {
    player.x += moveSpeed;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  }

  // Vertical movement + gravity
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
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
  if (e.code === "ArrowUp" || e.code === "Space") {
    jump();
  }
});

document.addEventListener("keyup", e => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

player.sprite.onload = () => {
  gameLoop();
};



