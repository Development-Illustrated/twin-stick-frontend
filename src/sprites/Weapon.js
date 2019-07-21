import Phaser from "phaser";
import Bullet from "./Bullet";

class Weapon {
  constructor(scene) {
    this.scene = scene;
    this.gunSound = this.scene.sound.add("9mmGun");
    this.bullet = Bullet;
    this.fireRate = 300;
  }

  destroyBullet(bullet, building) {
    bullet.destroy();
  }

  damageCharacter(characterHit, bulletHit) {
    if (bulletHit.active === true && characterHit.active === true) {
      characterHit.parent.health =
        characterHit.parent.health - bulletHit.damage;
      if (characterHit.parent.health <= 0) {
        characterHit.parent.destroy();
        characterHit.destroy();
      }
      bulletHit.destroy();
    }
  }

  create() {
    this.playerBullets = this.scene.physics.add.group({
      classType: this.bullet,
      runChildUpdate: true
    });
  }

  fireWeapon(player, crosshair, time) {
    var bullet = null;
    if (player.active === false) {
      return;
    }

    if (time > player.lastFired + this.fireRate) {
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
        this.scene.enemyHitboxes,
        bullet,
        this.damageCharacter
      );
      bullet.fire(player, crosshair);
      this.gunSound.play({
        volume: 0.1
      });
    }
  }

  update(time, delta) {
    this.bullet.update(time, delta);
  }
}

export default Weapon;
