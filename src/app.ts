const GRID_SIZE = 600;
let playGame: undefined | number = undefined;
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const restartBtn = document.querySelector(".restartBtn");
const snakeGrid = document.getElementById("snakeGrid");
const gameOverModalElement = document.getElementById("gameOver__modal");
const highScoreElement = document.getElementById("highscore");
const scoreElement = document.getElementById("score-count");
let SnakeSpeed = 100;

let scoreCount = 0;

let hasGameStarted = false;

interface SnakeBodyInt {
  newHeadIndx: number;
  oldTailIndx: number | undefined;
}

type SnakeBodyType = SnakeBodyInt | undefined;
type forEachCallback = (value: number, index?: number) => void;
enum SnakeDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
}

class LinkListNode {
  value: number;
  prev: LinkListNode | null;
  next: LinkListNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkList {
  head: LinkListNode | null;
  tail: LinkListNode | null;
  size: number = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtBegin(value: number) {
    const newNode = new LinkListNode(value);

    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const oldHead = this.head;
      newNode.next = oldHead;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return value;
  }
  insertAtEnd(value: number) {
    const newNode = new LinkListNode(value);

    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        const temp = this.tail;
        this.tail = newNode;
        this.tail.prev = temp;
        this.tail.prev.next = this.tail;
      }
    }
    this.size++;
    return value;
  }

  removeEndNode() {
    if (this.tail) {
      const deletedTailValue = this.tail.value;
      let prevNode = this.tail.prev;
      prevNode?.prev && (prevNode.next = null);
      this.tail = prevNode;
      this.size--;
      return deletedTailValue;
    }
  }
  forEach(callback: forEachCallback) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      callback(currentNode.value, index);
      currentNode = currentNode.next;
      index += 1;
    }
  }
}

class Snake extends DoubleLinkList {
  direction: SnakeDirection = SnakeDirection.RIGHT;
  constructor() {
    super();
  }

  moveUp() {
    // because we want to minus 30 from the head value we pass the arg -30
    // -1 to move Up
    return this.moveSnake(-30);
  }
  moveRight() {
    return this.moveSnake(1);
  }
  moveDown() {
    return this.moveSnake(30);
  }
  moveLeft() {
    // because we want to minus 1 from the head value we pass the arg -1
    // -1 to move left
    return this.moveSnake(-1);
  }

  private moveSnake(directionValue: number) {
    if (this.head) {
      let newHeadValue = this.head.value + directionValue;
      const newHeadIndx = this.insertAtBegin(newHeadValue);
      const oldTailIndx = this.removeEndNode();

      return { newHeadIndx, oldTailIndx };
    }
  }
}

const snake = new Snake();

function generateInitSnake(snake: Snake) {
  snake.head = null;
  snake.insertAtEnd(103);
  snake.insertAtEnd(102);
  snake.insertAtEnd(101);
  snake.insertAtEnd(100);
  // snake.insertAtEnd(99);
  // snake.insertAtEnd(98);
  // snake.insertAtEnd(97);
  // snake.insertAtEnd(96);
  // snake.insertAtEnd(95);
  // snake.insertAtEnd(94);
  // snake.insertAtEnd(93);
  // snake.insertAtEnd(92);
  // snake.insertAtEnd(91);
  // snake.insertAtEnd(90);
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

const gridBlock = document.querySelectorAll("#snakeGrid div");

let applePos = Math.floor(Math.random() * GRID_SIZE);
gridBlock[applePos].classList.add("apple");

function getHighScore() {
  const highScore = localStorage.getItem("lost-Snake#HS");

  if (!highScore) return 0;

  return parseInt(highScore);
}
function setHighScore(newHighScore: number) {
  localStorage.setItem("lost-Snake#HS", newHighScore.toString());
}

const highScore = getHighScore();
highScoreElement && (highScoreElement.textContent = highScore.toString());

interface SnakeBodyCacheType {
  [props: string]: boolean;
}

class SnakeBodyCache {
  cache: SnakeBodyCacheType = {};
  constructor(snake: Snake) {
    snake.forEach((bdyIndx, index) => {
      if (index !== 0) {
        this.addToCache(bdyIndx);
      }
    });
  }

  hasIndex(headIndx: number) {
    if (this.cache[headIndx]) {
      return true;
    }

    return false;
  }

  addBodyIndx(snake: Snake) {
    if (snake.head?.next) {
      let snakeBodyIndx = snake.head?.next.value;

      this.addToCache(snakeBodyIndx);
    }
  }

  removeBodyIndx(oldTailIndx: number | undefined) {
    if (oldTailIndx) {
      if (this.cache[oldTailIndx]) {
        this.cache[oldTailIndx] = false;
      }
    }
  }
  private addToCache(index: number) {
    if (!this.cache[index]) {
      this.cache[index] = true;
    }
  }
}

const snakeCache = new SnakeBodyCache(snake);

function drawSnake() {
  snake.forEach((index) => {
    gridBlock[index].classList.add("snakeBody");
  });
}
drawSnake();

function addSnakeBody(index: number) {
  if (index < 0 || index > 599) {
    console.log("stop");
    return;
  }
  gridBlock[index].classList.add("snakeBody");
}
function removeSnakeBody(index: number) {
  if (index < 0 || index > 599) {
    console.log("stop");
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
        const moveRightPos = snake.moveRight();

        moveSnake(moveRightPos);
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

    const snakeHeadIndx = snake.head?.value;

    if (scoreCount > highScore) {
      highScoreElement &&
        (highScoreElement.textContent = scoreCount.toString());
      setHighScore(scoreCount);
    }

    if (snakeHeadIndx) {
      if (snakeHeadIndx < 0) {
        snake.insertAtBegin(600 + snakeHeadIndx);
      }

      if (snakeHeadIndx > 599) {
        snake.insertAtBegin(600 - snakeHeadIndx);
      }

      //check if the snake head collide witht the body
      const isSnakeHeadEqualToBodyIndx = snakeCache.hasIndex(snakeHeadIndx);
      if (isSnakeHeadEqualToBodyIndx) {
        gameOverModalElement && (gameOverModalElement.style.display = "block");
        StopGame();
      }
    }

    const isSnakeBodyEqualToApplePos = snakeCache.hasIndex(applePos);
    const isSnakeHeadEqualTApplePos = snakeHeadIndx === applePos;

    if (isSnakeHeadEqualTApplePos || isSnakeBodyEqualToApplePos) {
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

      // inscrease snake speed
      if (scoreCount % 4 === 0 && SnakeSpeed > 60) {
        SnakeSpeed -= 5;

        //restart interval to adjust snake speed
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
  StopGame();
  snake.forEach((index) => {
    removeSnakeBody(index);
    snakeCache.removeBodyIndx(index);
  });
  scoreCount = 0;
  SnakeSpeed = 100;
  generateInitSnake(snake);
  gameOverModalElement && (gameOverModalElement.style.display = "none");
  startBtn?.click();
});

function restartGame() {
  restartBtn?.click();
}
