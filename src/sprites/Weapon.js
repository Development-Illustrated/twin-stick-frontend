// import Phaser from 'phaser'
// import Bullet from './Bullet'

// class Weapon {
//   constructor(scene) {
//     this.scene = scene
//   }

//   create() {
//     this.playerBullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });
//   }

//   fire (player, crosshair) {
//     if (player.active === false) {
//       return;
//     }

//     var bullet = this.playerBullets.get().setActive(true).setVisible(true);

//     if (bullet)
//     {
//       // Temp targeting till we implement the crosshair
//       target = {x: player.x - 100, y: 0}
//       Bullet.fire(player, target)
//       // Bullet.fire(player, crosshair)
//     }
//   }

//   update (time, delta) {
//     Bullet.update(time, delta)
//   }
// }

// export default Weapon

import Phaser from 'phaser'
import Bullet from './Bullet'

var Weapon = new Phaser.Class({
  // constructor(scene) {
  //   this.scene = scene
  // }

  initialize: function Weapon(scene) {
    // Phaser.GameObjects.Image.call(this, scene, 0, 0, 'gun')
    this.scene = scene
    this.bullet = Bullet
  },

  create: function() {
    this.playerBullets = this.scene.physics.add.group({ classType: this.bullet, runChildUpdate: true });
  },

  fire: function (player, crosshair) {
    if (player.active === false) {
      return;
    }

    var bullet = this.playerBullets.get().setActive(true).setVisible(true);

    if (bullet) {
      // Temp targeting till we implement the crosshair
      var target = {x: player.x - 100, y: 0}
      bullet.fire(player, target)
      // Bullet.fire(player, crosshair)
    }
  },

  update: function (time, delta) {
    this.bullet.update(time, delta)
  }
})

export default Weapon
