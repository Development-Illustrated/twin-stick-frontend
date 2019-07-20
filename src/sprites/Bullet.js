import Phaser from "phaser";

var Bullet = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Image,

  initialize: function Bullet(scene) {
    Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, "bullet");
    this.speed = 300;
    this.born = 0;
    this.direction = 0;
  },

  fire: function(shooter, target) {
    this.setPosition(shooter.x, shooter.y);
    // this.setAngle(target);
    this.scene.physics.velocityFromRotation(
      target,
      this.speed,
      this.body.velocity
    );
    this.body.velocity.x *= 1.25;
    this.body.velocity.y *= 1.25;
    this.direction = target;
  },

  update: function(time, delta) {
    // this.x += this.xSpeed * delta;
    // this.y += this.ySpeed * delta;
    this.born += delta;
    console.log(this.born);
    if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
      this.born = 0;
    }
  }
});

export default Bullet;
