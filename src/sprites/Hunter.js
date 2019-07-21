import Phaser from "phaser";

import Enemy from "./Enemy";
import EnemyAnimator from "../Animations/Enemy";

import { Hunter as Config } from "../config/zombies";

class Hunter extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, Config.tileset, Config.health, Config.movementSpeed);

    this.scene = scene;
    this.animator = new EnemyAnimator(scene, Config, this);
  }

  update() {
    this.animator.animate();
    super.update();
  }
}

export default Hunter;
