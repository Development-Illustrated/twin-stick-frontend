import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, "enemy");
    this.scene = scene;
    this.scene.add.existing(this);
  }

  update() {}
}

export default Enemy;
