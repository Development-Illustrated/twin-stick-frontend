import Phaser from 'phaser'

import backgroundImg from "../assets/images/menu-background.jpg";

class Loading extends Phaser.Scene {
  constructor() {
    super({
      key: "Loading"
    })
  }

  preload() {
    this.load.image("background", backgroundImg);

    this.load.audio(
      "backgroundMusic",
      "src/assets/audio/Creepy-Action.mp3",
      "../assets/audio/Creepy-Action.ogg"
    )

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    })

    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
    })

    this.load.on("complete", () => {
      console.log("done")
    })
  }

  create() {
    game.scene.start('MainMenu')
  }
}

export default Loading
