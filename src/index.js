import Phaser from "phaser";

import BootScene from "./scenes/Boot";

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 800,
  height: 700,
  scene: [BootScene]
};

window.game = new Phaser.Game(config);
