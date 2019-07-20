import Phaser from "phaser";

import Enemy from "../sprites/Enemy";

import logoImg from "../assets/logo.png";
import enemyImg from "../assets/enemy.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "bootscene"
    });
  }

  preload() {
    this.load.image("logo", logoImg);
    this.load.image("enemy", enemyImg);
  }

  create() {
    this.enemy = new Enemy({
      scene: this,
      x: 125,
      y: 125
    });
  }
}

export default BootScene;
