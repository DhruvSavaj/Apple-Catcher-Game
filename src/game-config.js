import { sizes, speedDown } from "./app.const";
import Phaser from "phaser";
import { GameScene } from "./GameScene";

export const gameConfig = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: speedDown,
      },
      debug: false,
    },
  },
  scene: [GameScene],
};
