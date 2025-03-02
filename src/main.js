import { gameConfig } from "./game-config";
import "./style.css";
import Phaser from "phaser";

const gameStartDiv = document.querySelector("#gameStartDiv");
const startGameBtn = document.querySelector("#btnGameStart");
const restartGameBtn = document.querySelector("#btnReGameStart");

const game = new Phaser.Game(gameConfig);

startGameBtn.addEventListener("click", () => {
  gameStartDiv.style.display = "none";
  game.scene.resume("scene-game");
});

restartGameBtn.addEventListener("click", () => {
  window.location.reload();
});
