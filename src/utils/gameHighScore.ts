// fetch the highscore from localstorage if there is a value
export function getHighScore() {
  const highScore = localStorage.getItem("lost-Snake#HS");

  if (!highScore) return 0;

  return parseInt(highScore);
}

// set the highscore in localstorage
export function setHighScore(newHighScore: number) {
  localStorage.setItem("lost-Snake#HS", newHighScore.toString());
}
