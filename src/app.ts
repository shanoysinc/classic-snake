import { SnakeDirection } from "./types/types";
import { GRID_SIZE } from "./constants/index";
import {
  gameOverModalElement,
  highScoreElement,
  scoreElement,
  pauseBtn,
  startBtn,
  modalRestartBtn,
  restartBtn,
} from "./DomElements/index";
import { gridBlockElements } from "./helpers/generateGrid";
import { generateInitSnake } from "./helpers/generateInitSnake";
import { Snake } from "./utils/snake";
import { SnakeBodyCache } from "./utils/snakeBodyCache";
import { setHighScore, getHighScore } from "./utils/gameHighScore";
import { increaseSnakeSize } from "./helpers/increaseSnakeSize";
import { removeSnakeBody } from "./helpers/removeSnakeBody";
import { moveSnake } from "./helpers/moveSnake";

let playGame: undefined | number = undefined;
let SnakeSpeed = 100;
let scoreCount = 0;

let isPause = false;
let hasGameStarted = false;
let isGameOver = false;

const snake = new Snake();
const snakeBodyCache = new SnakeBodyCache(snake);

generateInitSnake(snake);

// document.addEventListener("DOMContentLoaded", () => {

let applePos = Math.floor(Math.random() * GRID_SIZE);
gridBlockElements[applePos].classList.add("apple");

const highScore = getHighScore();
highScoreElement && (highScoreElement.textContent = highScore.toString());

function drawSnake() {
  snake.forEach((index) => {
    gridBlockElements[index].classList.add("snakeBody");
  });
}
drawSnake();

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

function StopGame() {
  clearInterval(playGame);
  playGame = undefined;
  hasGameStarted = false;
}

startBtn?.addEventListener("click", () => {
  if (hasGameStarted) return;
  hasGameStarted = true;

  playGame = window.setInterval(() => {
    switch (snake.direction) {
      case SnakeDirection.RIGHT:
        moveSnake(snake, snake.moveRight(), snakeBodyCache);
        break;

      case SnakeDirection.DOWN:
        moveSnake(snake, snake.moveDown(), snakeBodyCache);
        break;

      case SnakeDirection.UP:
        moveSnake(snake, snake.moveUp(), snakeBodyCache);
        break;

      case SnakeDirection.LEFT:
        moveSnake(snake, snake.moveLeft(), snakeBodyCache);
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

      //check if the snake head collides6 with its the body
      const isSnakeHeadEqualToBodyIndx = snakeBodyCache.hasIndex(snakeHeadIndx);
      if (isSnakeHeadEqualToBodyIndx) {
        isGameOver = true;

        gameOverModalElement && (gameOverModalElement.style.display = "block");
        StopGame();
      }
    }

    const isSnakeBodyEqualToApplePos = snakeBodyCache.hasIndex(applePos);
    const isSnakeHeadEqualToApplePos = snakeHeadIndx === applePos;

    if (isSnakeHeadEqualToApplePos || isSnakeBodyEqualToApplePos) {
      scoreCount++;
      scoreElement && (scoreElement.innerHTML = scoreCount.toString());
      gridBlockElements[applePos].classList.remove("apple");

      applePos = Math.floor(Math.random() * GRID_SIZE);
      gridBlockElements[applePos].classList.add("apple");

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

function restartGame() {
  isGameOver = false;

  StopGame();
  snake.forEach((index) => {
    removeSnakeBody(index);
    snakeBodyCache.removeBodyIndx(index);
  });
  scoreCount = 0;
  SnakeSpeed = 100;
  scoreElement && (scoreElement.innerHTML = scoreCount.toString());

  generateInitSnake(snake);
  gameOverModalElement && (gameOverModalElement.style.display = "none");
  startBtn?.click();
}

restartBtn?.addEventListener("click", restartGame);
modalRestartBtn?.addEventListener("click", restartGame);
