class PlayerAnimations {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.scene.anims.create({
      key: "player_still_down",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 1,
        end: 1
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_still_up",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 10,
        end: 10
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_still_left",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 4,
        end: 4
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_still_right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 8,
        end: 8
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_down",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_left",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 3,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 6,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_up",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 9,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}

export default PlayerAnimations;
