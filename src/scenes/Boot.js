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
      x: this.sys.game.canvas.width / 2,
      y: 300
    });

    this.enemies = this.add.group();
    this.time.addEvent({
      delay: 100,
      callback: function() {
        var enemy = new Enemy({
          scene: this,
          x: Phaser.Math.Between(0, this.sys.game.canvas.width),
          y: Phaser.Math.Between(0, this.sys.game.canvas.height)
        });
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    this.player.update();
    this.enemies.children.entries.map(child => child.update());
  }
}

export default BootScene;
