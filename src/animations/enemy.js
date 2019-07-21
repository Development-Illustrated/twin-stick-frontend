import SwarmerAssets from "../assets/spritesheets/Swarmer.png";
import HunterAssets from "../assets/spritesheets/Hunter.png";
import ChargerAssets from "../assets/spritesheets/Charger.png";
import WitchAssets from "../assets/spritesheets/Witch.png";
import SpitterAssets from "../assets/spritesheets/Spitter.png";

import { activeZombieList as ENEMY_TYPES } from "../config/zombies";

class EnemyAnimations {
  constructor(scene, config = null, entity = null) {
    this.scene = scene;
    this.lastMoved = "";
    this.entity = entity;
    if (config) {
      this.anim_type = config.tileset;
      this.anim_spritesheet = config.tilesheet;
      this.frameWidth = config.frameWidth;
      this.frameHeight = config.frameHeight;
      this.startFrame = config.startFrame;
    }
  }

  preload() {
    this.scene.load.spritesheet("swarmer", SwarmerAssets, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: this.startFrame
    });

    this.scene.load.spritesheet("hunter", HunterAssets, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: this.startFrame
    });

    this.scene.load.spritesheet("charger", ChargerAssets, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: this.startFrame
    });

    this.scene.load.spritesheet("witch", WitchAssets, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: this.startFrame
    });
    this.scene.load.spritesheet("spitter", SpitterAssets, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: this.startFrame
    });
  }

  create() {
    ENEMY_TYPES.map(enemy => {
      this.scene.anims.create({
        key: `${enemy}_enemy_still_down`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 1,
          end: 1
        }),
        frameRate: 0,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_still_up`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 10,
          end: 10
        }),
        frameRate: 0,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_still_left`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 4,
          end: 4
        }),
        frameRate: 0,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_still_right`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 8,
          end: 8
        }),
        frameRate: 0,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_down`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 0,
          end: 2
        }),
        frameRate: 10,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_left`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 3,
          end: 5
        }),
        frameRate: 10,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_right`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 6,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });
      this.scene.anims.create({
        key: `${enemy}_enemy_up`,
        frames: this.scene.anims.generateFrameNumbers(enemy, {
          start: 9,
          end: 11
        }),
        frameRate: 10,
        repeat: -1
      });
    });
  }

  animate() {
    if (this.entity) {
      if (this.entity.body.velocity.y < 0) {
        // left
        if (this.entity.body.velocity.x < 0) {
          // which is bigger
          if (
            Math.abs(this.entity.body.velocity.y) >
            Math.abs(this.entity.body.velocity.x)
          ) {
            // Y is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_up`, true);
            this.lastMoved = "up";
          } else {
            // X is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_left`, true);
            this.lastMoved = "left";
          }
        }
        // right
        else if (this.entity.body.velocity.x > 0) {
          // which is bigger
          if (
            Math.abs(this.entity.body.velocity.y) > this.entity.body.velocity.x
          ) {
            // Y is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_up`, true);
            this.lastMoved = "up";
          } else {
            // X is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_right`, true);
            this.lastMoved = "right";
          }
        } else {
          this.entity.anims.play(`${this.anim_type}_enemy_up`, true);
          this.lastMoved = "up";
        }
      } else if (this.entity.body.velocity.y > 0) {
        // left
        if (this.entity.body.velocity.x < 0) {
          // which is bigger
          if (
            Math.abs(this.entity.body.velocity.y) >
            Math.abs(this.entity.body.velocity.x)
          ) {
            // Y is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_down`, true);
            this.lastMoved = "down";
          } else {
            // X is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_left`, true);
            this.lastMoved = "left";
          }
        }
        // right
        else if (this.entity.body.velocity.x > 0) {
          // which is bigger
          if (
            Math.abs(this.entity.body.velocity.y) > this.entity.body.velocity.x
          ) {
            // Y is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_down`, true);
            this.lastMoved = "down";
          } else {
            // X is bigger
            this.entity.anims.play(`${this.anim_type}_enemy_right`, true);
            this.lastMoved = "right";
          }
        } else {
          this.entity.anims.play(`${this.anim_type}_enemy_down`, true);
          this.lastMoved = "down";
        }
      } else if (this.entity.body.velocity.x < 0) {
        this.entity.anims.play(`${this.anim_type}_enemy_left`, true);
        this.lastMoved = "left";
      } else if (this.entity.body.velocity.x > 0) {
        this.entity.anims.play(`${this.anim_type}_enemy_right`, true);
        this.lastMoved = "right";
      } else {
        switch (this.lastMoved) {
          case "up":
            this.entity.anims.play(`${this.anim_type}_enemy_still_up`);
            break;
          case "down":
            this.entity.anims.play(`${this.anim_type}_enemy_still_down`);
            break;
          case "left":
            this.entity.anims.play(`${this.anim_type}_enemy_still_left`);
            break;
          case "right":
            this.entity.anims.play(`${this.anim_type}_enemy_still_right`);
            break;
        }
      }
    }
  }
}

export default EnemyAnimations;
