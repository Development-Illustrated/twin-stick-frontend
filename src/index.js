import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import GameScene from "./scenes/Game";

var config = {
  type: Phaser.WEBGL,
  parent: "content",
  width: 800,
  height: 700,
  input: {
    gamepad: true
  },
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  zoom: 2,
  pixelArt: true,
  roundPixels: true
};

window.game = new Phaser.Game(config);
