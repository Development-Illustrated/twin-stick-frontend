import Phaser from "phaser";
import BootScene from "./scenes/Boot";
import GameScene from "./scenes/Game";

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 800,
  height: 700,
  zoom: 3,
  scene: [GameScene]
};

window.game = new Phaser.Game(config);
