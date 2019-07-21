import Phaser from "phaser";

import Enemy from "./Enemy";
import EnemyAnimator from "../Animations/Enemy";

import { Swarmer as Config } from "../config/zombies";

class Swarmer extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, Config.tileset, Config.health, Config.movementSpeed,Config.attackSpeed, Config.attackDamage);

    this.scene = scene;
    this.animator = new EnemyAnimator(scene, Config, this);
  }

  update() {
    this.animator.animate();
    super.update();
  }
}

export default Swarmer;
