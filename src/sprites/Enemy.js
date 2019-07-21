import Phaser from "phaser";

// --- Pathfinding
import { js } from "easystarjs";
import tilemap from "../assets/tilesets/horrormap.json";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, tileset, health, speed) {
    super(scene, x, y, tileset);

    this.scene = scene;
    this.health = health;
    this.speed = speed;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    this.easystar = new js();
    this.timestep = 400;

    this.playerX = this.scene.player.x;
    this.playerY = this.scene.player.y;
    this.enemyX = this.x;
    this.enemyY = this.y;
    this.currentNextPointX = null;
    this.currentNextPointY = null;
    this.enemyDirection = "STOP";

    this.easystar.setGrid(tilemap.colliders);
    this.easystar.setAcceptableTiles([1]);
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.enableDiagonals(); // Might want to remove this
    this.easystar.enableCornerCutting(); // Might want to remove this
  }

  create() {
    this.body.setSize(10, 6, false);
    this.body.setOffset(3, 32 - 6);
    this.body.setBounce(1);

    this.hitbox = new Phaser.GameObjects.Sprite(
      this.scene,
      this.body.x,
      this.body.y,
      null
    );

    this.hitbox.setSize(16, 28, false);
    this.hitbox.setVisible(false);

    this.hitbox.parent = this;
    this.scene.enemyHitboxes.add(this.hitbox);

    this.scene.add.existing(this.hitbox);
    this.scene.physics.world.enableBody(this.hitbox, 0);

    this.hitbox.body.setImmovable();
    this.hitbox.body.setBounce(0);

    this.scene.time.addEvent({
      delay: this.timestep,
      callback: function() {
        let self = this;
        this.easystar.findPath(
          self.enemyX,
          self.enemyY,
          self.playerX,
          self.playerY,
          function(path) {
            console.log("PATH:", path);
              if (path === null || path === []) {
              console.log("The path to the destination point was not found.");
            }
            if (path) {
              self.currentNextPointX = path[1].x;
              self.currentNextPointY = path[1].y;
            }

            if (
              self.currentNextPointX < self.enemyX &&
              self.currentNextPointY < self.enemyY
            ) {
              // left up
              self.enemyDirection = "NW";
            } else if (
              self.currentNextPointX === self.enemyX &&
              self.currentNextPointY < self.enemyY
            ) {
              // up
              self.enemyDirection = "N";
            } else if (
              self.currentNextPointX > self.enemyX &&
              self.currentNextPointY < self.enemyY
            ) {
              // right up
              self.enemyDirection = "NE";
            } else if (
              self.currentNextPointX < self.enemyX &&
              self.currentNextPointY === self.enemyY
            ) {
              // left
              self.enemyDirection = "W";
            } else if (
              self.currentNextPointX > self.enemyX &&
              self.currentNextPointY === self.enemyY
            ) {
              // right
              self.enemyDirection = "E";
            } else if (
              self.currentNextPointX > self.enemyX &&
              self.currentNextPointY > self.enemyY
            ) {
              // right down
              self.enemyDirection = "SE";
            } else if (
              self.currentNextPointX === self.enemyX &&
              self.currentNextPointY > self.enemyY
            ) {
              // down
              self.enemyDirection = "S";
            } else if (
              self.currentNextPointX < self.enemyX &&
              self.currentNextPointY > self.enemyY
            ) {
              // left down
              self.enemyDirection = "SW";
            } else {
              self.enemyDirection = "STOP";
            }
          }
        );
        this.easystar.calculate();
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
      this.hitbox.setPosition(this.body.x + 12, this.body.y - 5);

    this.playerX = Math.round(this.scene.player.x / 32);
    this.playerY = Math.round(this.scene.player.y / 32);
    this.enemyX = Math.floor(this.body.position.x / 32);
    this.enemyY = Math.floor(this.body.position.y / 32);

    console.log("EnemyDirection:", this.enemyDirection);
    // this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    if (this.enemyX != this.playerX || this.enemyY != this.playerY) {
      if (this.enemyDirection == "N") {
        this.body.velocity.x = 0;
        this.body.velocity.y = -this.speed;
      } else if (this.enemyDirection == "S") {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.speed;
      } else if (this.enemyDirection == "E") {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = 0;
      } else if (this.enemyDirection == "W") {
        this.body.velocity.x = -this.speed;
        this.body.velocity.y = 0;
      } else if (this.enemyDirection == "NE") {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = -this.speed;
      } else if (this.enemyDirection == "SE") {
        this.body.velocity.x = this.speed;
        this.body.velocity.y = this.speed;
      } else if (this.enemyDirection == "SW") {
        this.body.velocity.x = -this.speed;
        this.body.velocity.y = this.speed;
      } else if (this.enemyDirection == "NW") {
        this.body.velocity.x = -this.speed;
        this.body.velocity.y = -this.speed;
      } else if (this.enemyDirection == "STOP") {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }
  }
}

export default Enemy;
