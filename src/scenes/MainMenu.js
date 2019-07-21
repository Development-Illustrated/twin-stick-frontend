import Phaser from 'phaser'

class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: "MainMenu"
    })
  }

  create() {
    this.scene.remove('Loading')

    this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.33, "Twin Stick", {
      fontFamily: '"Roboto Condensed"',
      color: '#ffffff',
      align: 'center',
      fontSize: '64px'
    }).setOrigin(0.5).setDepth(1)

    let startButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.50, "Start", {
      fontFamily: '"Roboto Condensed"',
      color: '#ffffff',
      align: 'center',
      fontSize: '32px'
    }).setOrigin(0.5).setDepth(1)

    let backgroundImg = this.add.image(-500, 0, 'background').setOrigin(0).setDepth(0)
    backgroundImg.setScale(0.55, 0.55)

    startButton.setInteractive()

    startButton.on("pointerover", () => {
    })

    startButton.on("pointerout", () => {
    })

    startButton.on("pointerup", () => {
      this.scene.start('GameScene')
    })
  }
}

export default MainMenu
