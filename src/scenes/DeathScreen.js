import Phaser from 'phaser'

class DeathScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "DeathScreen"
    })
  }

  create() {
    this.cameras.main.setBackgroundColor('0xCC3232')
    this.cameras.main.setAlpha(0.3)

    this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.33, "FECKIN' DEAD!", {
      fontFamily: '"Roboto Condensed"',
      color: '#ffffff',
      align: 'center',
      fontSize: '160px'
    }).setOrigin(0.5).setDepth(1)

    let restartButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 0.60, "Restart", {
      fontFamily: '"Roboto Condensed"',
      color: '#ffffff',
      align: 'center',
      fontSize: '32px'
    }).setOrigin(0.5).setDepth(1)

    // let exitButton = this.add.text((2 * this.game.renderer.width) / 3, this.game.renderer.height * 0.60, "Exit", {
    //   fontFamily: '"Roboto Condensed"',
    //   color: '#ffffff',
    //   align: 'center',
    //   fontSize: '32px'
    // }).setOrigin(0.5).setDepth(1)

    let backgroundImg = this.add.image(-500, 0, 'background').setOrigin(0).setDepth(0)
    backgroundImg.setScale(0.55, 0.55)

    restartButton.setInteractive()
    // exitButton.setInteractive()

    var gameScene = this.scene.get('GameScene')
    restartButton.on("pointerup", () => {
      gameScene.scene.restart()
      this.scene.start('GameScene')
      // this.scene.restart('GameScene')
    })
    // exitButton.on("pointerup", () => {
    //   gameScene.scene.restart()
    //   this.scene.remove('GameScene')
    //   this.scene.start('MainMenu')
    // })
  }
}

export default DeathScreen
