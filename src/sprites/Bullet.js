import Phaser from "phaser";

class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, "bullet");
    this.scene = scene;

    this.speed = 300;
    this.born = 0;
    this.direction = 0;
    this.damage = 1;
    this.scaleX = 0.5;
    this.scaleY = 0.5;
  }

  fire(shooter, target) {
    this.setPosition(shooter.x, shooter.y);
    this.scene.physics.velocityFromRotation(
      target,
      this.speed,
      this.body.velocity
    );
    this.setSize(10, 10, false);
    this.body.velocity.x *= 1.25;
    this.body.velocity.y *= 1.25;
    this.direction = target;
  }

  update(time, delta) {
    this.born += delta;
    if (this.born > 1000) {
      this.destroy();
    }
  }
}

export default Bullet;
