import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import GameScene from "./scenes/Game";

var config = {
  type: Phaser.WEBGL,
  parent: "content",
  width: 1600,
  height: 800,
  input: {
    gamepad: true
  },
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true
    }
  },
  pixelArt: true,
  roundPixels: true
};

window.game = new Phaser.Game(config);
