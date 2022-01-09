export const startBtn = document.querySelector<HTMLButtonElement>(".startBtn");
export const pauseBtn = document.querySelector<HTMLButtonElement>(".pauseBtn");
export const restartBtn =
  document.querySelector<HTMLButtonElement>(".restartBtn");
export const snakeGrid = document.getElementById("snakeGrid");
export const gameOverModalElement = document.getElementById("gameOver__modal");
export const highScoreElement = document.getElementById("highscore");
export const scoreElement = document.getElementById("score-count");
export const GRID_SIZE = 600;

// a single block in the grid
export const gridBlock = document.querySelectorAll("#snakeGrid div");
