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
        start: 37,
        end: 37
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_still_left",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 13,
        end: 13
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_still_right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 25,
        end: 25
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
        start: 12,
        end: 14
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_right",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 24,
        end: 26
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "player_up",
      frames: this.scene.anims.generateFrameNumbers("player", {
        start: 36,
        end: 38
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}

export default PlayerAnimations;
