"use strict";
const GRID_SIZE = 600;
let playGame = undefined;
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const restartBtn = document.querySelector(".restartBtn");
const snakeGrid = document.getElementById("snakeGrid");
const gameOverModalElement = document.getElementById("gameOver__modal");
const highScoreElement = document.getElementById("highscore");
const scoreElement = document.getElementById("score-count");
let isPause = false;
let SnakeSpeed = 100;
let scoreCount = 0;
let hasGameStarted = false;
let isGameOver = false;
var SnakeDirection;
(function(SnakeDirection1) {
    SnakeDirection1["LEFT"] = "LEFT";
    SnakeDirection1["RIGHT"] = "RIGHT";
    SnakeDirection1["UP"] = "UP";
    SnakeDirection1["DOWN"] = "DOWN";
})(SnakeDirection || (SnakeDirection = {
}));
class LinkListNode {
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class DoubleLinkList {
    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    insertAtBegin(value) {
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
    insertAtEnd(value) {
        const newNode = new LinkListNode(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            const temp = this.tail;
            this.tail = newNode;
            this.tail.prev = temp;
            this.tail.prev.next = this.tail;
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
    forEach(callback) {
        let currentNode = this.head;
        let index = 0;
        while(currentNode){
            callback(currentNode.value, index);
            currentNode = currentNode.next;
            index += 1;
        }
    }
}
class Snake extends DoubleLinkList {
    constructor(){
        super();
        this.direction = SnakeDirection.RIGHT;
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
    moveSnake(directionValue) {
        if (this.head) {
            let newHeadValue = this.head.value + directionValue;
            const newHeadIndx = this.insertAtBegin(newHeadValue);
            const oldTailIndx = this.removeEndNode();
            return {
                newHeadIndx,
                oldTailIndx
            };
        }
    }
}
const snake = new Snake();
function generateInitSnake(snake1) {
    snake1.head = null;
    snake1.insertAtEnd(103);
    snake1.insertAtEnd(102);
    snake1.insertAtEnd(101);
    snake1.insertAtEnd(100);
}
generateInitSnake(snake);
// document.addEventListener("DOMContentLoaded", () => {
function generateGrid() {
    for(let index = 0; index < GRID_SIZE; index++){
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
    const highScore1 = localStorage.getItem("lost-Snake#HS");
    if (!highScore1) return 0;
    return parseInt(highScore1);
}
function setHighScore(newHighScore) {
    localStorage.setItem("lost-Snake#HS", newHighScore.toString());
}
const highScore = getHighScore();
highScoreElement && (highScoreElement.textContent = highScore.toString());
class SnakeBodyCache {
    constructor(snake2){
        this.cache = {
        };
        snake2.forEach((bdyIndx, index)=>{
            if (index !== 0) this.addToCache(bdyIndx);
        });
    }
    hasIndex(headIndx) {
        if (this.cache[headIndx]) return true;
        return false;
    }
    addBodyIndx(snake3) {
        if (snake3.head?.next) {
            let snakeBodyIndx = snake3.head?.next.value;
            this.addToCache(snakeBodyIndx);
        }
    }
    removeBodyIndx(oldTailIndx) {
        if (oldTailIndx) {
            if (this.cache[oldTailIndx]) this.cache[oldTailIndx] = false;
        }
    }
    addToCache(index) {
        if (!this.cache[index]) this.cache[index] = true;
    }
}
const snakeCache = new SnakeBodyCache(snake);
function drawSnake() {
    snake.forEach((index)=>{
        gridBlock[index].classList.add("snakeBody");
    });
}
drawSnake();
function addSnakeBody(index) {
    if (index < 0 || index > GRID_SIZE - 1) return;
    gridBlock[index].classList.add("snakeBody");
}
function removeSnakeBody(index) {
    if (index < 0 || index > GRID_SIZE - 1) return;
    gridBlock[index].classList.remove("snakeBody");
}
function moveSnake(snakeBody) {
    // adding the previous head to cache
    snakeCache.addBodyIndx(snake);
    if (snakeBody?.oldTailIndx) {
        snakeCache.removeBodyIndx(snakeBody.oldTailIndx);
        removeSnakeBody(snakeBody.oldTailIndx);
    }
    if (snakeBody?.newHeadIndx) addSnakeBody(snakeBody.newHeadIndx);
}
function snakeControl(e) {
    // console.log(e.keyCode);
    if (e.keyCode === 82) restartBtn?.click();
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
        if (snake.direction === SnakeDirection.DOWN || snake.direction === SnakeDirection.UP) return;
        snake.direction = SnakeDirection.DOWN;
    } else if (e.keyCode === 39) {
        //prevent user from clicking multiply times to move the snake
        if (snake.direction === SnakeDirection.RIGHT || snake.direction === SnakeDirection.LEFT) return;
        snake.direction = SnakeDirection.RIGHT;
    } else if (e.keyCode === 38) {
        //prevent user from clicking multiply times to move the snake
        if (snake.direction === SnakeDirection.UP || snake.direction === SnakeDirection.DOWN) return;
        snake.direction = SnakeDirection.UP;
    } else if (e.keyCode === 37) {
        if (snake.direction === SnakeDirection.UP || snake.direction === SnakeDirection.DOWN) snake.direction = SnakeDirection.LEFT;
    }
}
document.addEventListener("keyup", snakeControl);
function increaseSnakeSize(snake4) {
    if (snake4.head && snake4.tail) {
        const newTailIndx = snake4.tail.value - 1;
        snake4.insertAtEnd(newTailIndx);
        gridBlock[newTailIndx].classList.add("snakeBody");
    }
}
function StopGame() {
    clearInterval(playGame);
    playGame = undefined;
    hasGameStarted = false;
}
startBtn?.addEventListener("click", ()=>{
    if (hasGameStarted) return;
    hasGameStarted = true;
    playGame = setInterval(()=>{
        switch(snake.direction){
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
            highScoreElement && (highScoreElement.textContent = scoreCount.toString());
            setHighScore(scoreCount);
        }
        const snakeHeadIndx = snake.head?.value;
        if (snakeHeadIndx) {
            if (snakeHeadIndx < 0) snake.insertAtBegin(600 + snakeHeadIndx);
            if (snakeHeadIndx > 599) snake.insertAtBegin(600 - snakeHeadIndx);
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
            } else if (scoreCount % 2 === 0) increaseSnakeSize(snake);
            // increase snake speed
            if (scoreCount % 4 === 0 && SnakeSpeed > 60) {
                SnakeSpeed -= 5;
                //restart interval to adjust snake speed
                StopGame();
                startBtn?.click();
            }
        }
    }, SnakeSpeed);
});
pauseBtn?.addEventListener("click", ()=>{
    StopGame();
});
restartBtn?.addEventListener("click", ()=>{
    isGameOver = false;
    StopGame();
    snake.forEach((index)=>{
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
function restartGame() {
    restartBtn?.click();
}

//# sourceMappingURL=index.c2ffd818.js.map
