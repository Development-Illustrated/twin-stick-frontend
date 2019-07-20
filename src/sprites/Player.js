import Phaser from 'phaser'
import Weapon from './Weapon'

class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'player')

    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(this, 0)

    this.PLAYER_VELOCITY = 100
  }

  create() {
    this.lastFired = null

    this.keyW = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    )
    this.keyS = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    )
    this.keyA = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    )
    this.keyD = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    )
    this.space = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.weapon = new Weapon(this.scene)
    this.weapon.create()

    this.gamePad = this.scene.input.gamepad1
  }

  update() {
    if (this.keyW.isDown) {
      this.body.velocity.y = -this.PLAYER_VELOCITY
    } else if (this.keyS.isDown) {
      this.body.velocity.y = this.PLAYER_VELOCITY
    } else {
      this.body.velocity.y = 0
    }
    if (this.keyA.isDown) {
      this.body.velocity.x = -this.PLAYER_VELOCITY
    } else if (this.keyD.isDown) {
      this.body.velocity.x = this.PLAYER_VELOCITY
    } else {
      this.body.velocity.x = 0
    }

    if (this.space.isDown) {
      var crosshair = this
      this.weapon.fireWeapon(this, crosshair, Date.now())
    }
    var pointer = this.scene.input.mousePointer
    var mouseAngle = Phaser.Math.Angle.Between(this.body.x,this.body.y, pointer.x, pointer.y)

    if(!this.gamePad){
      try {
        this.gamePad = this.scene.input.gamepad.pad1
      } catch (TypeError) {
        console.log(TypeError)
        //no gamepad
      }
    }
    else {
      //Move the player
      this.body.velocity.x = (this.gamePad.leftStick.x*this.PLAYER_VELOCITY)
      this.body.velocity.y = (this.gamePad.leftStick.y*this.PLAYER_VELOCITY)
      
      //Use the angle to do the fire method
      var newAngle = getAngle()
      
    }
  }
}

function getAngle(){ 
  var angle = Math.atan2(this.gamePad.rightStick.y,this.gamePad.rightStick.x) // Radians
  var degrees = 180*angle/Math.PI; //Degrees
  return (360+Math.round(degrees))%360; //round number, avoid decimal fragments
}

export default Player;
