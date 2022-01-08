import { SnakeBodyType, SnakeDirection } from "./types/types";
import { Snake } from "./utils/snake";
import { SnakeBodyCache } from "./utils/snakeBodyCache";

const startBtn = document.querySelector<HTMLButtonElement>(".startBtn");
const pauseBtn = document.querySelector<HTMLButtonElement>(".pauseBtn");
const restartBtn = document.querySelector<HTMLButtonElement>(".restartBtn");
const snakeGrid = document.getElementById("snakeGrid");
const gameOverModalElement = document.getElementById("gameOver__modal");
const highScoreElement = document.getElementById("highscore");
const scoreElement = document.getElementById("score-count");

const GRID_SIZE = 600;

let playGame: undefined | number = undefined;

let SnakeSpeed = 100;
let scoreCount = 0;

let isPause = false;
let hasGameStarted = false;
let isGameOver = false;

const snake = new Snake();
const snakeCache = new SnakeBodyCache(snake);

function generateInitSnake(snake: Snake) {
  snake.head = null;
  snake.insertAtEnd(103);
  snake.insertAtEnd(102);
  snake.insertAtEnd(101);
  snake.insertAtEnd(100);
}
generateInitSnake(snake);

// document.addEventListener("DOMContentLoaded", () => {

function generateGrid() {
  for (let index = 0; index < GRID_SIZE; index++) {
    const divElement = document.createElement("div");
    divElement.classList.add(`gridIndx-${index}`);
    snakeGrid?.appendChild(divElement);
  }
}

generateGrid();

// a single block in the grid
const gridBlock = document.querySelectorAll("#snakeGrid div");

let applePos = Math.floor(Math.random() * GRID_SIZE);
gridBlock[applePos].classList.add("apple");

// fetch the highscore from localstorage if there is a value
function getHighScore() {
  const highScore = localStorage.getItem("lost-Snake#HS");

  if (!highScore) return 0;

  return parseInt(highScore);
}

// set the highscore in localstorage
function setHighScore(newHighScore: number) {
  localStorage.setItem("lost-Snake#HS", newHighScore.toString());
}

const highScore = getHighScore();
highScoreElement && (highScoreElement.textContent = highScore.toString());

function drawSnake() {
  snake.forEach((index) => {
    gridBlock[index].classList.add("snakeBody");
  });
}
drawSnake();

function addSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlock[index].classList.add("snakeBody");
}

function removeSnakeBody(index: number) {
  if (index < 0 || index > GRID_SIZE - 1) {
    return;
  }
  gridBlock[index].classList.remove("snakeBody");
}

function moveSnake(snakeBody: SnakeBodyType) {
  // adding the previous head to cache
  snakeCache.addBodyIndx(snake);
  if (snakeBody?.oldTailIndx) {
    snakeCache.removeBodyIndx(snakeBody.oldTailIndx);
    removeSnakeBody(snakeBody.oldTailIndx);
  }
  if (snakeBody?.newHeadIndx) {
    addSnakeBody(snakeBody.newHeadIndx);
  }
}

function snakeControl(e: { keyCode: number }) {
  // user can click the button R to restart game
  if (e.keyCode === 82) {
    restartBtn?.click();
  }
  // space bar keycode
  if (e.keyCode === 32) {
    if (isGameOver) return;
    if (isPause) {
      startBtn?.click();
      isPause = false;
      return;
    }
    pauseBtn?.click();
    isPause = true;
  }

  if (e.keyCode === 40) {
    //prevent user from clicking multiply times to move the snake
    if (
      snake.direction === SnakeDirection.DOWN ||
      snake.direction === SnakeDirection.UP
    ) {
      return;
    }

    snake.direction = SnakeDirection.DOWN;
  } else if (e.keyCode === 39) {
    //prevent user from clicking multiply times to move the snake
    if (
      snake.direction === SnakeDirection.RIGHT ||
      snake.direction === SnakeDirection.LEFT
    ) {
      return;
    }

    snake.direction = SnakeDirection.RIGHT;
  } else if (e.keyCode === 38) {
    //prevent user from clicking multiply times to move the snake
    if (
      snake.direction === SnakeDirection.UP ||
      snake.direction === SnakeDirection.DOWN
    ) {
      return;
    }

    snake.direction = SnakeDirection.UP;
  } else if (e.keyCode === 37) {
    if (
      snake.direction === SnakeDirection.UP ||
      snake.direction === SnakeDirection.DOWN
    ) {
      snake.direction = SnakeDirection.LEFT;
    }
  }
}
document.addEventListener("keyup", snakeControl);

function increaseSnakeSize(snake: Snake) {
  if (snake.head && snake.tail) {
    const newTailIndx = snake.tail.value - 1;
    snake.insertAtEnd(newTailIndx);
    gridBlock[newTailIndx].classList.add("snakeBody");
  }
}

function StopGame() {
  clearInterval(playGame);
  playGame = undefined;
  hasGameStarted = false;
}

startBtn?.addEventListener("click", () => {
  if (hasGameStarted) return;
  hasGameStarted = true;

  playGame = setInterval(() => {
    switch (snake.direction) {
      case SnakeDirection.RIGHT:
        moveSnake(snake.moveRight());
        break;

      case SnakeDirection.DOWN:
        moveSnake(snake.moveDown());
        break;

      case SnakeDirection.UP:
        moveSnake(snake.moveUp());
        break;

      case SnakeDirection.LEFT:
        moveSnake(snake.moveLeft());
        break;

      default:
        break;
    }

    if (scoreCount > highScore) {
      highScoreElement &&
        (highScoreElement.textContent = scoreCount.toString());
      setHighScore(scoreCount);
    }

    const snakeHeadIndx = snake.head?.value;

    if (snakeHeadIndx) {
      if (snakeHeadIndx < 0) {
        snake.insertAtBegin(600 + snakeHeadIndx);
      }

      if (snakeHeadIndx > 599) {
        snake.insertAtBegin(600 - snakeHeadIndx);
      }

      //check if the snake head collide with its the body
      const isSnakeHeadEqualToBodyIndx = snakeCache.hasIndex(snakeHeadIndx);
      if (isSnakeHeadEqualToBodyIndx) {
        isGameOver = true;

        gameOverModalElement && (gameOverModalElement.style.display = "block");
        StopGame();
      }
    }

    const isSnakeBodyEqualToApplePos = snakeCache.hasIndex(applePos);
    const isSnakeHeadEqualToApplePos = snakeHeadIndx === applePos;

    if (isSnakeHeadEqualToApplePos || isSnakeBodyEqualToApplePos) {
      scoreCount++;
      scoreElement && (scoreElement.innerHTML = scoreCount.toString());
      gridBlock[applePos].classList.remove("apple");

      applePos = Math.floor(Math.random() * GRID_SIZE);
      gridBlock[applePos].classList.add("apple");

      if (scoreCount >= 15 && scoreCount % 2 === 0) {
        increaseSnakeSize(snake);
        increaseSnakeSize(snake);
      } else if (scoreCount % 2 === 0) {
        increaseSnakeSize(snake);
      }

      // increase snake speed
      if (scoreCount % 4 === 0 && SnakeSpeed > 60) {
        SnakeSpeed -= 5;

        //restart interval to adjust snake speed when it is decrease
        StopGame();
        startBtn?.click();
      }
    }
  }, SnakeSpeed);
});

pauseBtn?.addEventListener("click", () => {
  StopGame();
});

restartBtn?.addEventListener("click", () => {
  isGameOver = false;

  StopGame();
  snake.forEach((index) => {
    removeSnakeBody(index);
    snakeCache.removeBodyIndx(index);
  });
  scoreCount = 0;
  SnakeSpeed = 100;
  scoreElement && (scoreElement.innerHTML = scoreCount.toString());

  generateInitSnake(snake);
  gameOverModalElement && (gameOverModalElement.style.display = "none");
  startBtn?.click();
});

// Note: this function is used in the index.html file
// on the restart button
function restartGame() {
  restartBtn?.click();
}
