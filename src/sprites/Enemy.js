import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, tileset, health, speed) {
    super(scene, x, y, tileset);

    this.scene = scene;
    this.health = health;
    this.speed = speed;

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.health = 1;
    this.damage = 1;
    this.attackSpeed = 2000;
    this.attacking = false;
    //Attack sounds
    this.attackSound = this.scene.sound.add("zombieAttack")
  }

  create() {
    this.body.setSize(10, 6, false);
    this.body.setOffset(3, 32 - 6);
    this.body.setBounce(1);

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
    if(!this.attacking){
      this.body.setVelocity(
        Math.cos(angle) * this.speed,
        Math.sin(angle) * this.speed
      );
    }
    

    

    this.hitbox.setPosition(this.body.x + 12, this.body.y - 5);
  }

  attack(attacker, target){
    var time = Date.now()
    if(time > attacker.lastAttacked + attacker.attackSpeed )
    {
      attacker.attackSound.play({
        volume: 1.0
      })
       
      target.parent.health -= attacker.damage
      console.log("Target HP: "+ target.parent.health)
      if(target.parent.health <= 0){
        // target.parent.destroy()
        // target.destroy()
      }
      attacker.lastAttacked = Date.now()
    }

    
    
  }

}

export default Enemy;
