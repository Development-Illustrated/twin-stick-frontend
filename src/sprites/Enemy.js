import Phaser from "phaser";

// --- Pathfinding
let timestep = 400;
let playerX;
let playerY;
let enemyX;
let enemyY;
let currentNextPointX;
let currentNextPointY;
let enemyDirection  = "STOP";
import {js} from "easystarjs"
import tilemap from "../assets/tilesets/horrormap.json"


// ********************* EasyStar setup *********************
let easystar;
let timeStep = 400; // pathway computation time interval in milliseconds


class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, tileset, health, speed) {
    super(scene, x, y, tileset);

    this.scene = scene;
    this.health = health;
    this.speed = speed;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    easystar.setGrid(tilemap.colliders);
    easystar.setAcceptableTiles([1]);
    easystar.setIterationsPerCalculation(1000);
    easystar.enableDiagonals(); // Might want to remove this
    easystar.enableCornerCutting(); // Might want to remove this
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
    
    setInterval(function() {
    easystar.findPath(enemyX, enemyY, playerX, playerY, function (path) {
        console.log("PATH:", path);
        if (path === null) {
            console.log("The path to the destination point was not found.");
        }

        if (path) {
            currentNextPointX = path[1].x;
            currentNextPointY = path[1].y;
        }

        if (currentNextPointX < enemyX && currentNextPointY < enemyY) {
            // left up
            enemyDirection = "NW";
        } else if (currentNextPointX === enemyX && currentNextPointY < enemyY) {
            // up
            enemyDirection = "N";
        } else if (currentNextPointX > enemyX && currentNextPointY < enemyY) {
            // right up
            enemyDirection = "NE";
        } else if (currentNextPointX < enemyX && currentNextPointY === enemyY) {
            // left
            enemyDirection = "W";
        } else if (currentNextPointX > enemyX && currentNextPointY === enemyY) {
            // right
            enemyDirection = "E";
        } else if (currentNextPointX > enemyX && currentNextPointY > enemyY) {
            // right down
            enemyDirection = "SE";
        } else if (currentNextPointX === enemyX && currentNextPointY > enemyY) {
            // down
            enemyDirection = "S";
        } else if (currentNextPointX < enemyX && currentNextPointY > enemyY) {
            // left down
            enemyDirection = "SW";
        } else {
            enemyDirection = "STOP";
        }
    });
    easystar.calculate();
}, timestep);
  }

  update() {
    let dx = this.scene.player.x - this.x;
    let dy = this.scene.player.y - this.y;
    let angle = Math.atan2(dy, dx);

    this.body.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );

    this.hitbox.setPosition(this.body.x + 12, this.body.y - 5);
    
    playerX = Math.round(this.scene.player.x / 32);
        playerY = Math.round(this.scene.player.y / 32);
        enemyX = Math.floor(this.body.position.x / 32);
        enemyY= Math.floor(this.body.position.y / 32);
    
        console.log("EnemyDirection:", enemyDirection);
        // this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        if (enemyX != playerX || enemyY != playerY) {
            if (enemyDirection == "N") {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else if (enemyDirection == "S") {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else if (enemyDirection == "E") {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (enemyDirection == "W") {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (enemyDirection == "NE") {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = -this.speed;
            } else if (enemyDirection == "SE") {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = this.speed;
            } else if (enemyDirection == "SW") {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = this.speed;
            } else if (enemyDirection == "NW") {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = -this.speed;
            } else if (enemyDirection == "STOP") {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }
  }
}

export default Enemy;
