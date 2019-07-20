class EnemyAnimations {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    this.scene.anims.create({
      key: "enemy_still_down",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 1,
        end: 1
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_still_up",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 37,
        end: 37
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_still_left",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 13,
        end: 13
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_still_right",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 25,
        end: 25
      }),
      frameRate: 0,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_down",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 3,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_left",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 15,
        end: 17
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_right",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 27,
        end: 29
      }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: "enemy_up",
      frames: this.scene.anims.generateFrameNumbers("enemy", {
        start: 39,
        end: 41
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}

export default EnemyAnimations;
