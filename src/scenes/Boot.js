import Phaser from "phaser";

import Enemy from "../sprites/Enemy";
import Player from "../sprites/Player";

import enemyImg from "../assets/images/enemy.png";
import playerImg from "../assets/images/player.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });

    this.currentEnemies = 0;
    this.MAX_ENEMIES = 1;
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
    this.player.create();

    this.enemies = this.add.group();
    this.time.addEvent({
      delay: 100,
      callback: function() {
        if (this.currentEnemies <= this.MAX_ENEMIES - 1) {
          var enemy = new Enemy({
            scene: this,
            x: Phaser.Math.Between(0, this.sys.game.canvas.width),
            y: Phaser.Math.Between(0, this.sys.game.canvas.height)
          });
          this.enemies.add(enemy);
          this.currentEnemies = this.currentEnemies + 1;
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.enemies, this.enemies);
  }

  update() {
    this.player.update();
    this.enemies.children.entries.map(child => child.update());
  }
}

export default BootScene;
