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
    let speed = 75;

    this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
  }
}

export default Enemy;
