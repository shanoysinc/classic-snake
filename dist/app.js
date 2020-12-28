"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const snakeGrid = document.querySelector(".snakeGrid");
    function generateGrid() {
        for (let index = 0; index < 810; index++) {
            const divElement = document.createElement("div");
            snakeGrid.appendChild(divElement);
        }
    }
    generateGrid();
    let snake = [405, 406, 407, 408, 409];
    const gridBlock = document.querySelectorAll(".snakeGrid div");
    function drawSnake() {
        snake.forEach((index) => {
            gridBlock[index].classList.add("snake");
        });
    }
    drawSnake();
    function unDrawSnake() {
        snake.forEach((index) => {
            gridBlock[index].classList.remove("snake");
        });
    }
    // unDrawSnake();
    function moveForward() {
        // console.log("move");
        unDrawSnake();
        snake.forEach((pos, index) => {
            snake[index] -= 1;
        });
        drawSnake();
        // console.log(snake);
    }
    // setInterval(moveForward, 100);
});
