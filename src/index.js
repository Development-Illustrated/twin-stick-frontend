import Phaser from "phaser";

import GameScene from "./scenes/Game";
import LoadingScene from "./scenes/Loading";
import MainMenuScene from "./scenes/MainMenu";
import DeathScreenScene from "./scenes/DeathScreen";

var config = {
  type: Phaser.WEBGL,
  parent: "content",
  width: 1600,
  height: 800,
  input: {
    gamepad: true
  },
  scene: [LoadingScene, MainMenuScene, GameScene, DeathScreenScene],
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
