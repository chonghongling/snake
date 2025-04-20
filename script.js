// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const gridSize = 20; // 20px x 20px grid
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;

let gameInterval;
const gameSpeed = 250; // in milliseconds

// DOM elements
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function initGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 }; // ✅ Snake starts moving right
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}


// Game loop
function gameLoop() {
  update();
  draw();
}

function draw() {
    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
  
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function update() {
    // Create new head
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };
  
    // Check for collisions with wall
    if (
      head.x < 0 || head.x >= tileCount ||
      head.y < 0 || head.y >= tileCount
    ) {
      return gameOver();
    }
  
    // Check for collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      return gameOver();
    }
  
    snake.unshift(head); // Add new head
  
    // Check for food
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      food = generateFood();
    } else {
      snake.pop(); // Remove tail if no food eaten
    }
  }

  function generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
    }
  });

  function gameOver() {
    clearInterval(gameInterval);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }

  restartBtn.addEventListener("click", initGame);

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    initGame();});

