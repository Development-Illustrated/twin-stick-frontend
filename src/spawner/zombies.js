import Phaser from "phaser";

// Sprites
import Swarmer from "../sprites/Swarmer";
import Hunter from "../sprites/Hunter";
import Charger from "../sprites/Charger";
import Spitter from "../sprites/Spitter";
import Witch from "../sprites/Witch";

// Config
import {
  Swarmer as SwarmerConfig,
  Hunter as HunterConfig,
  Charger as ChargerConfig,
  Spitter as SpitterConfig,
  Witch as WitchConfig
} from "../config/zombies";

class Zombie {
  constructor(scene) {
    this.scene = scene;
  }

  spawn() {
    // Spawn Swarmer
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(
        SwarmerConfig.minRespawn,
        SwarmerConfig.maxRespawn
      ),
      callback: function() {
        if (
          this.scene.enemyTypes.swarmer.children.size <= SwarmerConfig.maxAlive -1
        ) {
          console.log("swarmer spawned");
          var enemy = new Swarmer(
            this.scene,
            Phaser.Math.Between(0, this.scene.sys.game.canvas.width),
            Phaser.Math.Between(0, this.scene.sys.game.canvas.height)
          );
          enemy.create();
          this.scene.enemies.add(enemy);
          this.scene.enemyTypes.swarmer.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    // Spawn Hunter
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(
        HunterConfig.minRespawn,
        HunterConfig.maxRespawn
      ),
      callback: function() {
        if (
          this.scene.enemyTypes.hunter.children.size <= HunterConfig.maxAlive - 1
        ) {
          console.log("hunter spawned");
          var enemy = new Hunter(
            this.scene,
            Phaser.Math.Between(0, this.scene.sys.game.canvas.width),
            Phaser.Math.Between(0, this.scene.sys.game.canvas.height)
          );
          enemy.create();
          this.scene.enemies.add(enemy);
          this.scene.enemyTypes.hunter.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    // Spawn Charger
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(
        ChargerConfig.minRespawn,
        ChargerConfig.maxRespawn
      ),
      callback: function() {
        if (
          this.scene.enemyTypes.charger.children.size <= ChargerConfig.maxAlive - 1
        ) {
          console.log("charger spawned");
          var enemy = new Charger(
            this.scene,
            Phaser.Math.Between(0, this.scene.sys.game.canvas.width),
            Phaser.Math.Between(0, this.scene.sys.game.canvas.height)
          );
          enemy.create();
          this.scene.enemies.add(enemy);
          this.scene.enemyTypes.charger.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    // Spawn Spitter
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(
        SpitterConfig.minRespawn,
        SpitterConfig.maxRespawn
      ),
      callback: function() {
        if (
          this.scene.enemyTypes.spitter.children.size <= SpitterConfig.maxAlive - 1
        ) {
          console.log("spitter spawned");
          var enemy = new Spitter(
            this.scene,
            Phaser.Math.Between(0, this.scene.sys.game.canvas.width),
            Phaser.Math.Between(0, this.scene.sys.game.canvas.height)
          );
          enemy.create();
          this.scene.enemies.add(enemy);
          this.scene.enemyTypes.spitter.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    // Spawn Witch
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(
        WitchConfig.minRespawn,
        WitchConfig.maxRespawn
      ),
      callback: function() {
        if (this.scene.enemyTypes.witch.children.size <= WitchConfig.maxAlive -1) {
          console.log("witch spawned");
          var enemy = new Witch(
            this.scene,
            Phaser.Math.Between(0, this.scene.sys.game.canvas.width),
            Phaser.Math.Between(0, this.scene.sys.game.canvas.height)
          );
          enemy.create();
          this.scene.enemies.add(enemy);
          this.scene.enemyTypes.witch.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });
  }
}

export default Zombie;
