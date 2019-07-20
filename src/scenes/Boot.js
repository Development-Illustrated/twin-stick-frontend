import Phaser from "phaser";
import playerImg from "../assets/player.png";
import Player from "../sprites/Player";

class BootScene extends Phaser.Scene {
  preload() {
    this.load.image("player", playerImg);
  }

  create() {
    this.player = new Player({
      scene: this,
      x: 150,
      y: 150
    })
    this.player.create()
  }

  update() {
    this.player.update()
  }
}

export default BootScene;
