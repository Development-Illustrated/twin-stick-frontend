import Phaser from 'phaser'

class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'player')

    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0)
  }

  create () {
    this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update() {
    if (this.keyW.isDown) {
      this.body.velocity.y = -50
    } else if (this.keyS.isDown) {
      this.body.velocity.y = 50
    } else {
      this.body.velocity.y = 0
    }
    if (this.keyA.isDown) {
      this.body.velocity.x = -50
    } else if (this.keyD.isDown) {
      this.body.velocity.x = 50
    } else {
      this.body.velocity.x = 0
    }
  }
}

export default Player
