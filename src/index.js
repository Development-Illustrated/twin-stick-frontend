import Phaser from "phaser";
import BootScene from "./scenes/Boot";

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 800,
  height: 700,
  scene: [BootScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  pixelArt: true,
  roundPixels: true
};

window.game = new Phaser.Game(config);
