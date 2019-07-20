import Phaser from 'phaser'

class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'player')

    this.scene = scene
    this.scene.add.existing(this)
  }

  create () {
    // this.player = this.physics.add.sprite(800, 600, 'player')

    // this.moveKeys = this.input.keyboard.addKeys({
    //   'up': Phaser.Input.Keyboard.KeyCodes.W,
    //   'down': Phaser.Input.Keyboard.KeyCodes.S,
    //   'left': Phaser.Input.Keyboard.KeyCodes.A,
    //   'right': Phaser.Input.Keyboard.KeyCodes.D
    // })

    // this.input.keyboard.on('keydown_W', function (event) {
    //   this.player.setAccelerationY(-800)
    // })
    // this.input.keyboard.on('keydown_S', function (event) {
    //   this.player.setAccelerationY(800)
    // })
    // this.input.keyboard.on('keydown_A', function (event) {
    //   this.player.setAccelerationX(-800)
    // })
    // this.input.keyboard.on('keydown_D', function (event) {
    //   this.player.setAccelerationX(800)
    // })

    // this.input.keyboard.on('keyup_W', function (event) {
    //   if (this.moveKeys['down'].isUp)
    //     this.player.setAccelerationY(0)
    // })
    // this.input.keyboard.on('keyup_S', function (event) {
    //     if (this.moveKeys['up'].isUp)
    //       this.player.setAccelerationY(0)
    // })
    // this.input.keyboard.on('keyup_A', function (event) {
    //     if (this.moveKeys['right'].isUp)
    //       this.player.setAccelerationX(0)
    // })
    // this.input.keyboard.on('keyup_D', function (event) {
    //     if (this.moveKeys['left'].isUp)
    //       this.player.setAccelerationX(0)
    // })
  }

  update() {
    // this.constrainVelocity(this.player, 500)
  }

  constrainVelocity(sprite, maxVelocity) {
    if (!sprite || !sprite.body)
      return

    var angle, currVelocitySqr, vx, vy
    vx = sprite.body.velocity.x
    vy = sprite.body.velocity.y
    currVelocitySqr = vx * vx + vy * vy

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx)
        vx = Math.cos(angle) * maxVelocity
        vy = Math.sin(angle) * maxVelocity
        sprite.body.velocity.x = vx
        sprite.body.velocity.y = vy
    }
  }
}

export default Player
