import Phaser from 'phaser'

var Bullet = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Bullet(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
    this.speed = 0
    this.born = 0
    this.direction = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.setSize(12, 12, true)
  },

  fire: function (shooter, target) {
    console.log('firing')
    this.setPosition(shooter.x, shooter.y)
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y))

    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction)
      this.ySpeed = this.speed * Math.cos(this.direction)
    } else {
      this.xSpeed = - this.speed * Math.sin(this.direction)
      this.ySpeed = - this.speed * Math.cos(this.direction)
    }

    this.rotation = shooter.rotation
    this.born = 0
  },

  update: function (time, delta) {
    this.x += this.speed * delta
    this.y += this.speed * delta

    this.born += delta
    if (this.born > 1800) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
})

export default Bullet
