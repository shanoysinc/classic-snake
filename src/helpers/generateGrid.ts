import { GRID_SIZE } from "../constants/index";
import { snakeGrid } from "../DomElements/index";

function generateGrid() {
  for (let index = 0; index < GRID_SIZE; index++) {
    const divElement = document.createElement("div");
    divElement.classList.add(`gridIndx-${index}`);
    snakeGrid?.appendChild(divElement);
  }
}

function getGridBlockElements() {
  const gridBlockElements = document.querySelectorAll("#snakeGrid div");
  return gridBlockElements;
}

function initGrid() {
  generateGrid();
  const gridBlockElements = getGridBlockElements();
  return {
    gridBlockElements,
  };
}

export const { gridBlockElements } = initGrid();
