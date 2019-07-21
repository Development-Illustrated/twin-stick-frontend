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
    constructor({scene, x, y}) {
        super(scene, x, y, "enemy");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.health = 1;
        easystar = new js;
        // Pathfinding
        easystar.setGrid(tilemap.colliders);
        easystar.setAcceptableTiles([1]);
        easystar.setIterationsPerCalculation(1000);
        easystar.enableDiagonals(); // Might want to remove this
        easystar.enableCornerCutting(); // Might want to remove this
    }

    create() {
        this.body.setSize(10, 6, false);
        this.body.setOffset(3, 32 - 6);
        this.body.setBounce(0);
        this.body.setImmovable(); // stop pushing

        //hit box
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

        playerX = Math.round(this.scene.player.x / 32);
        playerY = Math.round(this.scene.player.y / 32);
        enemyX = Math.floor(this.body.position.x / 32);
        enemyY= Math.floor(this.body.position.y / 32);

        let speed = 35;
        console.log("EnemyDirection:", enemyDirection);
        // this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        if (enemyX != playerX || enemyY != playerY) {
            if (enemyDirection == "N") {
                this.body.velocity.x = 0;
                this.body.velocity.y = -speed;
            } else if (enemyDirection == "S") {
                this.body.velocity.x = 0;
                this.body.velocity.y = speed;
            } else if (enemyDirection == "E") {
                this.body.velocity.x = speed;
                this.body.velocity.y = 0;
            } else if (enemyDirection == "W") {
                this.body.velocity.x = -speed;
                this.body.velocity.y = 0;
            } else if (enemyDirection == "NE") {
                this.body.velocity.x = speed;
                this.body.velocity.y = -speed;
            } else if (enemyDirection == "SE") {
                this.body.velocity.x = speed;
                this.body.velocity.y = speed;
            } else if (enemyDirection == "SW") {
                this.body.velocity.x = -speed;
                this.body.velocity.y = speed;
            } else if (enemyDirection == "NW") {
                this.body.velocity.x = -speed;
                this.body.velocity.y = -speed;
            } else if (enemyDirection == "STOP") {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }
        //move hitbox
        this.hitbox.setPosition(this.body.x + 12, this.body.y - 5);

        if (this.body.velocity.y < 0) {
            // left
            if (this.body.velocity.x < 0) {
                // which is bigger
                if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
                    // Y is bigger
                    this.anims.play("enemy_up", true);
                    this.lastMoved = "up";
                } else {
                    // X is bigger
                    this.anims.play("enemy_left", true);
                    this.lastMoved = "left";
                }
            }
            // right
            else if (this.body.velocity.x > 0) {
                // which is bigger
                if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
                    // Y is bigger
                    this.anims.play("enemy_up", true);
                    this.lastMoved = "up";
                } else {
                    // X is bigger
                    this.anims.play("enemy_right", true);
                    this.lastMoved = "right";
                }
            } else {
                this.anims.play("enemy_up", true);
                this.lastMoved = "up";
            }
        } else if (this.body.velocity.y > 0) {
            // left
            if (this.body.velocity.x < 0) {
                // which is bigger
                if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
                    // Y is bigger
                    this.anims.play("enemy_down", true);
                    this.lastMoved = "down";
                } else {
                    // X is bigger
                    this.anims.play("enemy_left", true);
                    this.lastMoved = "left";
                }
            }
            // right
            else if (this.body.velocity.x > 0) {
                // which is bigger
                if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
                    // Y is bigger
                    this.anims.play("enemy_down", true);
                    this.lastMoved = "down";
                } else {
                    // X is bigger
                    this.anims.play("enemy_right", true);
                    this.lastMoved = "right";
                }
            } else {
                this.anims.play("enemy_down", true);
                this.lastMoved = "down";
            }
        } else if (this.body.velocity.x < 0) {
            this.anims.play("enemy_left", true);
            this.lastMoved = "left";
        } else if (this.body.velocity.x > 0) {
            this.anims.play("enemy_right", true);
            this.lastMoved = "right";
        } else {
            switch (this.lastMoved) {
                case "up":
                    this.anims.play("enemy_still_up");
                    break;
                case "down":
                    this.anims.play("enemy_still_down");
                    break;
                case "left":
                    this.anims.play("enemy_still_left");
                    break;
                case "right":
                    this.anims.play("enemy_still_right");
                    break;
            }
        }
    }
}

export default Enemy;
