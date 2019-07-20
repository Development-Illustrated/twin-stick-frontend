import Phaser from 'phaser'
import Bullet from './Bullet'

var Weapon = new Phaser.Class({
  initialize: function Weapon(scene) {
    this.scene = scene
    this.bullet = Bullet
  },

  damageCharacter: function(characterHit, bulletHit) {
    if (bulletHit.active === true && characterHit.active === true) {
      characterHit.health = characterHit.health - bulletHit.damage
      console.log("Enemy health:", characterHit.health)
      if (characterHit.health <= 0) {
        characterHit.destroy()
      }

      bulletHit.destroy()
    }
  },

  create: function() {
    this.playerBullets = this.scene.physics.add.group({ classType: this.bullet, runChildUpdate: true })
  },

  fireWeapon: function (player, crosshair, time) {
    var bullet = null
    if (player.active === false) {
      return
    }

    if (time > player.lastFired + 1000) {
      bullet = this.playerBullets.get().setActive(true).setVisible(true)
    }

    if (bullet) {
      var target = {x: player.x - 100, y: player.y}
      player.lastFired = time
      this.scene.physics.add.collider(this.scene.enemies, bullet, this.damageCharacter);
      bullet.fire(player, target)
    // bullet.fire(player, crosshair)
    }
  },

  update: function (time, delta) {
    this.bullet.update(time, delta)
  }
})

export default Weapon
