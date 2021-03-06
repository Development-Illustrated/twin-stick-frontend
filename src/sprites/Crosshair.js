import Phaser from 'phaser'

class Crosshair extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'crosshair')
    this.scene = scene
    this.player = scene.player
    this.x = x
    this.y = y
    var scale = 0.4
    this.scaleX = scale
    this.scaleY = scale
    this.setSize(12, 12, false)

    this.halfWidth = (this.width / 2) * scale
    this.halfHeight = (this.height / 2) * scale

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
  }

  create () {
    this.setVisible(false)


    // REMOVE THE THING THAT LOCKS THE MOUSE TO THE SCREEN
    // // Pointer lock will only work after mousedown
    // this.scene.sys.game.canvas.addEventListener('mousedown', function () {
    //   game.input.mouse.requestPointerLock();
    // });

    // // console.log(this.scene.input.mouse.removeListener('mousedown'))

    // // Exit pointer lock when Q or escape (by default) is pressed.
    // this.scene.input.keyboard.on('keydown_Q', function (event) {
    //   if (game.input.mouse.locked)
    //     game.input.mouse.releasePointerLock();
    // }, 0, this.scene);
  }

  // Ensures reticle does not move offscreen
  constrainReticle() {
    var distX = this.x - this.scene.player.x; // X distance between player & crosshair
    var distY = this.y - this.scene.player.y; // Y distance between player & crosshair

    // Different levels of zoom will change the constraints required by the screen
    var halfHeight = this.scene.cameras.main.displayHeight / (this.scene.cameras.main.zoom / 2)
    var halfWidth = this.scene.cameras.main.displayWidth / (this.scene.cameras.main.zoom / 2)

    if (distX > halfWidth)
      this.x = this.scene.player.x+halfWidth;
    else if (distX < -halfWidth)
      this.x = this.scene.player.x-halfWidth;

    if (distY > halfHeight)
      this.y = this.scene.player.y+halfHeight;
    else if (distY < -halfHeight)
      this.y = this.scene.player.y-halfHeight;
  }

  updateReticlePosition() {
    if (this.player.gamePad.rightStick.x != 0 || this.player.gamePad.rightStick.y != 0) {
      var newAngle = this.player.getAngle();

      this.x = this.player.x + (60 * Math.cos(newAngle))
      this.y = this.player.y + (60 * Math.sin(newAngle))
    } else {
      this.setVisible(false)
    }
  }

  update() {
    if (this.scene.player.usingPad) {
      this.updateReticlePosition()
    } else {
      this.setVisible(true)
      this.scene.input.on('pointermove', function (pointer) {
        // if (this.scene.input.mouse.locked) {
          this.x = pointer.worldX + (pointer.movementX * 0.5)
          this.y = pointer.worldY + (pointer.movementY * 0.5)

          this.constrainReticle()
        // }
      }, this);
    }
  }
}

export default Crosshair
