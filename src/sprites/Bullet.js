import Phaser from "phaser";

var Bullet = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Image,

  initialize: function Bullet(scene) {
    Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, "bullet");
    this.speed = 300;
    this.born = 0;
    this.direction = 0;
    this.damage = 1
    this.scaleX = 0.5
    this.scaleY = 0.5
  },

  fire: function(shooter, target) {
    this.setPosition(shooter.x, shooter.y);
    this.scene.physics.velocityFromRotation(
      target,
      this.speed,
      this.body.velocity
    );
    this.setSize(10, 10, false)
    this.body.velocity.x *= 1.25;
    this.body.velocity.y *= 1.25;
    this.direction = target;
  },

  update: function(time, delta) {
    // this.x += this.xSpeed * delta;
    // this.y += this.ySpeed * delta;
    this.born += delta;
    if (this.born > 1800) {
      this.destroy()
    }
  }
});

export default Bullet;
