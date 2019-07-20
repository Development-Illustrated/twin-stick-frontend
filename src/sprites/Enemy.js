import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "enemy");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
  }

  update() {
    // if (Phaser.Math.Distance.Between(
    //   this.x,
    //   this.y,
    //   this.scene.player.x,
    //   this.scene.player.y
    // ) < 320) {
    //   this.state = this.states.CHASE;
    // }
    // if (this.state == this.states.CHASE) {
    var dx = this.scene.player.x - this.x;
    var dy = this.scene.player.y - this.y;
    var angle = Math.atan2(dy, dx);
    var speed = 100;
    this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
  }
}

export default Enemy;
