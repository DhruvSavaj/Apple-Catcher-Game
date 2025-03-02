import Phaser from "phaser";
import { moneyEmitterConfig, sizes, speedDown } from "./app.const";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 100;
    this.target;
    this.points = 0;
    this.textScore;

    this.gameBG_Music;
    this.points_Music;
    this.pointsEmitter;
  }

  preload() {
    this.load.image("game-bg", "/assets/bg.png ");
    this.load.image("basket", "/assets/basket.png");
    this.load.image("apple", "/assets/apple.png");
    this.load.image("money-emitter", "/assets/money.png");

    this.load.audio("game-bg-music", "/assets/bgMusic.mp3");
    this.load.audio("points-music", "/assets/coin.mp3");
  }

  create() {
    this.scene.pause("scene-game");

    this.add.image(0, 0, "game-bg").setOrigin(0, 0);

    this.points_Music = this.sound.add("points-music");
    this.gameBG_Music = this.sound.add("game-bg-music");
    this.gameBG_Music.play();

    this.player = this.physics.add.image(0, sizes.height - 100, "basket").setOrigin(0, 0);
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player.setSize(100, 15).setOffset(0, 40); //basket collision boundary

    this.target = this.physics.add.image(this.getRandomX(), 0, "apple").setOrigin(0, 0);
    this.target.setMaxVelocity(0, speedDown);
    this.target.setSize(30, 30); //apple collision boundary

    this.physics.add.overlap(this.target, this.player, this.targetHit, null, this);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.textScore = this.add.text(sizes.width - 120, 10, "Score: 0", {
      font: "25px Arial",
      fill: "#000000",
    });

    this.pointsEmitter = this.add.particles(0, 0, "money-emitter", moneyEmitterConfig);
    this.pointsEmitter.startFollow(this.player, this.player.width / 2, this.player.height / 2, true);
  }

  update() {
    if (this.target.y >= sizes.height - 50) {
      //infinite drop
      // this.target.setY(0);
      // this.target.setX(this.getRandomX());

      this.gameOver();
    }
    const { left, right } = this.cursor;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
  }

  getRandomX() {
    return Math.floor(Math.random() * (sizes.width - 20));
  }

  targetHit() {
    this.points_Music.play();
    this.pointsEmitter.start();

    this.target.setY(0);
    this.target.setX(this.getRandomX());
    this.setScoreBoard(this.points + 1);
  }

  gameOver() {
    const gameEndDiv = document.querySelector("#gameEndDiv");
    const gameScoreSpan = document.querySelector("#gameEndScoreSpan");

    gameEndDiv.style.display = "flex";
    gameScoreSpan.innerHTML = this.points;

    this.gameBG_Music.stop();
    //this.setScoreBoard(0);
    //this.sys.game.destroy(true);
  }

  setScoreBoard(score) {
    this.points = score;
    this.textScore.setText(`Score: ${score}`);
  }
}
