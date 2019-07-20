import Phaser from 'phaser'
import Bullet from './Bullet'

class Weapon {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.playerBullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true });
  }

  fire (player, crosshair) {
    if (player.active === false) {
      return;
    }

    var bullet = playerBullets.get().setActive(true).setVisible(true);

    if (bullet)
    {
      // Temp targeting till we implement the crosshair
      target = {x: player.x - 100, y: 0}
      Bullet.fire(player, target)
      // Bullet.fire(player, crosshair)
    }
  }

  update (time, delta) {
    Bullet.update(time, delta)
  }
}

export default Weapon
