import Phaser from "phaser";

var gamePad

class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "player");

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    this.PLAYER_VELOCITY = 100;
  }

  create() {
    this.keyW = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.keyS = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.keyA = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keyD = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    
    this.gamePad = this.scene.input.gamepad


  }

  update() {
    if (this.keyW.isDown) {
      this.body.velocity.y = -this.PLAYER_VELOCITY;
    } else if (this.keyS.isDown) {
      this.body.velocity.y = this.PLAYER_VELOCITY;
    } else {
      this.body.velocity.y = 0;
    }
    if (this.keyA.isDown) {
      this.body.velocity.x = -this.PLAYER_VELOCITY;
    } else if (this.keyD.isDown) {
      this.body.velocity.x = this.PLAYER_VELOCITY;
    } else {
      this.body.velocity.x = 0;
    }

    console.log(this.gamePad.leftStick)
  }
}

export default Player;
