import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "enemy");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.health = 1;
    this.damage = 1;
    this.attackSpeed = 5000;
    //Attack sounds
    this.attackSound = this.scene.sound.add("zombieAttack")
    console.log(this.attackSound)
  }

  create() {
    this.body.setSize(10, 6, false);
    this.body.setOffset(3, 32 - 6);
    this.body.setBounce(1);
    // this.body.setImmovable(); // stop pushing

    this.lastAttacked = Date.now()
    this.health = 1;
    //hit box
    this.hitbox = new Phaser.GameObjects.Sprite(
      this.scene,
      this.body.x,
      this.body.y,
      null
    );

    this.hitbox.setSize(16, 28, false);
    this.hitbox.setVisible(false);

    this.hitbox.parent = this;
    this.scene.enemyHitboxes.add(this.hitbox);

    this.scene.add.existing(this.hitbox);
    this.scene.physics.world.enableBody(this.hitbox, 0);
    this.hitbox.body.setImmovable();
    this.hitbox.body.setBounce(0);
  }

  update() {
    let dx = this.scene.player.x - this.x;
    let dy = this.scene.player.y - this.y;
    let angle = Math.atan2(dy, dx);
    let speed = 35;
    this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    // move hitbox
    this.hitbox.setPosition(this.body.x + 12, this.body.y - 5);

    if (this.body.velocity.y < 0) {
      // left
      if (this.body.velocity.x < 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
          // Y is bigger
          this.anims.play("enemy_up", true);
          this.lastMoved = "up";
        } else {
          // X is bigger
          this.anims.play("enemy_left", true);
          this.lastMoved = "left";
        }
      }
      // right
      else if (this.body.velocity.x > 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
          // Y is bigger
          this.anims.play("enemy_up", true);
          this.lastMoved = "up";
        } else {
          // X is bigger
          this.anims.play("enemy_right", true);
          this.lastMoved = "right";
        }
      } else {
        this.anims.play("enemy_up", true);
        this.lastMoved = "up";
      }
    } else if (this.body.velocity.y > 0) {
      // left
      if (this.body.velocity.x < 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
          // Y is bigger
          this.anims.play("enemy_down", true);
          this.lastMoved = "down";
        } else {
          // X is bigger
          this.anims.play("enemy_left", true);
          this.lastMoved = "left";
        }
      }
      // right
      else if (this.body.velocity.x > 0) {
        // which is bigger
        if (Math.abs(this.body.velocity.y) > this.body.velocity.x) {
          // Y is bigger
          this.anims.play("enemy_down", true);
          this.lastMoved = "down";
        } else {
          // X is bigger
          this.anims.play("enemy_right", true);
          this.lastMoved = "right";
        }
      } else {
        this.anims.play("enemy_down", true);
        this.lastMoved = "down";
      }
    } else if (this.body.velocity.x < 0) {
      this.anims.play("enemy_left", true);
      this.lastMoved = "left";
    } else if (this.body.velocity.x > 0) {
      this.anims.play("enemy_right", true);
      this.lastMoved = "right";
    } else {
      switch (this.lastMoved) {
        case "up":
          this.anims.play("enemy_still_up");
          break;
        case "down":
          this.anims.play("enemy_still_down");
          break;
        case "left":
          this.anims.play("enemy_still_left");
          break;
        case "right":
          this.anims.play("enemy_still_right");
          break;
      }
    }
  }

  attack(attacker, target){
    var time = Date.now()
    // console.log("time " + time)
    // console.log(attacker.lastAttacked + attacker.attackSpeed)
    if(time > attacker.lastAttacked + attacker.attackSpeed )
    {
      console.log("Sounds play?")
      console.log(attacker.attackSound.play({
        volume: 1.0
      }))
      target.health -= attacker.damage
      console.log("Target HP: "+ target.health)
      if(target.health <= 0){
        target.destroy()
      }
      attacker.lastAttacked = Date.now()
    }

    
    
  }

}

export default Enemy;
