import Phaser from "phaser";
import Bullet from "./Bullet";

const FIRE_RATE = 200;

var Weapon = new Phaser.Class({
  initialize: function Weapon(scene) {
    this.scene = scene;
    this.gunSound = this.scene.sound.add("9mmGun")
    this.bullet = Bullet;
  },

  destroyBullet: function(bullet, building) {
    bullet.destroy();
  },

  damageCharacter: function(characterHit, bulletHit) {
    if (bulletHit.active === true && characterHit.active === true) {
      characterHit.health = characterHit.health - bulletHit.damage;
      console.log("Enemy health:", characterHit.health);
      if (characterHit.health <= 0) {
        characterHit.destroy();
      }

      bulletHit.destroy();
    }
  },

  create: function() {
    this.playerBullets = this.scene.physics.add.group({
      classType: this.bullet,
      runChildUpdate: true
    });
  },

  fireWeapon: function(player, crosshair, time) {
    var bullet = null;
    if (player.active === false) {
      return;
    }

    if (time > player.lastFired + FIRE_RATE) {
      bullet = this.playerBullets
        .get()
        .setActive(true)
        .setVisible(true);

      this.scene.physics.add.collider(
        bullet,
        this.scene.buildingLayer,
        this.destroyBullet
      );
    }

    if (bullet) {
      player.lastFired = time;
      this.scene.physics.add.collider(
        this.scene.enemies,
        bullet,
        this.damageCharacter
      );
      bullet.fire(player, crosshair);
      this.gunSound.play()
    }
  },

  update: function(time, delta) {
    this.bullet.update(time, delta);
  }
});

export default Weapon;
