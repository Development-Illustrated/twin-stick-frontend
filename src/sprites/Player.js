import Phaser from "phaser";
import Weapon from "./Weapon";

class Player extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "player");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    this.PLAYER_VELOCITY = 100;
  }

  create() {
    this.lastFired = null;

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
    this.space = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.weapon = new Weapon(this.scene);
    this.weapon.create();

    this.gamePad = this.scene.input.gamepad1;
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

    if (this.space.isDown) {
      var pointer = this.scene.input.mousePointer;
      var mouseAngle = Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        pointer.x,
        pointer.y
      );
      this.weapon.fireWeapon(this, mouseAngle, Date.now());
    }

    if (!this.gamePad) {
      try {
        this.gamePad = this.scene.input.gamepad.pad1;
        this.gamePad.setAxisThreshold(0.3);
      } catch (TypeError) {
        console.log(TypeError);
        //no gamepad
      }
    } else {
      //Move the player
      this.body.velocity.x = this.gamePad.leftStick.x * this.PLAYER_VELOCITY;
      this.body.velocity.y = this.gamePad.leftStick.y * this.PLAYER_VELOCITY;

      //Use the angle to do the fire method
      if (this.gamePad.rightStick.x != 0 || this.gamePad.rightStick.y != 0) {
        var newAngle = this.getAngle();
        this.weapon.fireWeapon(this, newAngle, Date.now());
      }
    }

    // ahhhnimations

    if (this.body.velocity.y < 0) {
      // left
      if (this.body.velocity.x < 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
          // Y is bigger
          this.anims.play("player_up", true);
          this.lastMoved = "up";
        } else {
          // X is bigger
          this.anims.play("player_left", true);
          this.lastMoved = "left";
        }
      }
      // right
      else if (this.body.velocity.x > 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
          // Y is bigger
          this.anims.play("player_up", true);
          this.lastMoved = "up";
        } else {
          // X is bigger
          this.anims.play("player_right", true);
          this.lastMoved = "right";
        }
      } else {
        this.anims.play("player_up", true);
        this.lastMoved = "up";
      }
    } else if (this.body.velocity.y > 0) {
      // left
      if (this.body.velocity.x < 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
          // Y is bigger
          this.anims.play("player_down", true);
          this.lastMoved = "down";
        } else {
          // X is bigger
          this.anims.play("player_left", true);
          this.lastMoved = "left";
        }
      }
      // right
      else if (this.body.velocity.x > 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
          // Y is bigger
          this.anims.play("player_down", true);
          this.lastMoved = "down";
        } else {
          // X is bigger
          this.anims.play("player_right", true);
          this.lastMoved = "right";
        }
      } else {
        this.anims.play("player_down", true);
        this.lastMoved = "down";
      }
    } else if (this.body.velocity.x < 0) {
      this.anims.play("player_left", true);
      this.lastMoved = "left";
    } else if (this.body.velocity.x > 0) {
      this.anims.play("player_right", true);
      this.lastMoved = "right";
    } else {
      switch (this.lastMoved) {
        case "up":
          this.anims.play("player_still_up");
          break;
        case "down":
          this.anims.play("player_still_down");
          break;
        case "left":
          this.anims.play("player_still_left");
          break;
        case "right":
          this.anims.play("player_still_right");
          break;
      }
    }
  }

  getAngle() {
    var angle = Math.atan2(
      this.gamePad.rightStick.x,
      this.gamePad.rightStick.y
    ); // Radians

    let deg = Phaser.Math.RadToDeg(angle);

    deg = 90 - deg;

    return Phaser.Math.DegToRad(deg);
  }
}

export default Player;
