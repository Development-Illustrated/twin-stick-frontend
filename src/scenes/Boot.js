import Phaser from "phaser";

import Enemy from "../sprites/Enemy";
import Player from "../sprites/Player";

import enemyImg from "../assets/enemy.png";
import playerImg from "../assets/player.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "bootscene"
    });
  }

  preload() {
    this.load.image("enemy", enemyImg);
    this.load.image("player", playerImg);
  }

  create() {
    this.player = new Player({
      scene: this,
      x: 150,
      y: 150
    });

    this.enemy = new Enemy({
      scene: this,
      x: 125,
      y: 125
    });
  }
}

export default BootScene;
