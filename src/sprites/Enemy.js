import Phaser from "phaser";

// --- Pathfinding
import { js } from "easystarjs";
import tilemap from "../assets/tilesets/horrormap.json";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(
    scene,
    x,
    y,
    tileset,
    health,
    speed,
    attackSpeed,
    attackDamage,
    score
  ) {
    super(scene, x, y, tileset);

    this.scene = scene;
    this.health = health;
    this.speed = speed;
    this.attackSpeed = attackSpeed;
    this.attackDamage = attackDamage;
    this.score = score;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    this.attacking = false;
    //Attack sounds
    this.attackSound = this.scene.sound.add("zombieAttack");

    this.easystar = new js();
    this.timestep = 200;

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

    this.lastAttacked = Date.now();

    //hit box
    this.hitbox = new Phaser.GameObjects.Sprite(
      this.scene,
      this.body.x,
      this.body.y,
      null
    );

    this.hitbox.setSize(16, 28, false);
    this.hitbox.setVisible(false);

    this.hitbox.scene = this.scene;
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
            if (path != null && path.length > 0) {
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
              self.enemyDirection = "FUCKKNOWS";
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

    this.playerX = Math.abs(Math.ceil(this.scene.player.x / 32));
    this.playerY = Math.abs(Math.ceil(this.scene.player.y / 32));
    this.enemyX = Math.abs(Math.ceil(this.body.position.x / 32));
    this.enemyY = Math.abs(Math.ceil(this.body.position.y / 32));

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
      } else if (this.enemyDirection == "FUCKKNOWS") {
        let angle = Math.atan2(this.playerY, this.playerX);
        this.body.setVelocity(
          Math.cos(angle) * this.speed,
          Math.sin(angle) * this.speed
        );
      } else if (this.enemyDirection == "STOP") {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }
  }

  destroy() {
    this.scene.score += this.score;
    this.scene.scoreText.setText("Score: " + this.scene.score);

    super.destroy();
  }

  attack(attacker, target) {
    var time = Date.now();
    if (time > attacker.lastAttacked + attacker.attackSpeed) {
      attacker.attackSound.play({
        volume: 1.0
      });

      target.parent.health -= attacker.attackDamage;
      console.log("Player HP: " + target.parent.health);
      if (target.parent.health <= 0) {
        // target.parent.destroy()
        // target.destroy()
      }
      attacker.lastAttacked = Date.now();
    }
  }
}

export default Enemy;
