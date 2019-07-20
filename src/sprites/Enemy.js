import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "enemy");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
  }

  update() {
    let dx = this.scene.player.x - this.x;
    let dy = this.scene.player.y - this.y;
    let angle = Math.atan2(dy, dx);
    let speed = 50;

    this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

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
