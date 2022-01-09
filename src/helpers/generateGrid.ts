import { GRID_SIZE, snakeGrid } from "../constants/index";

export function generateGrid() {
  for (let index = 0; index < GRID_SIZE; index++) {
    const divElement = document.createElement("div");
    divElement.classList.add(`gridIndx-${index}`);
    snakeGrid?.appendChild(divElement);
  }
}
