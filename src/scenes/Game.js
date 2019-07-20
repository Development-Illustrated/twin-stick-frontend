import Phaser from "phaser";
import playerImg from "../assets/images/player_j.png";
import playerSprites from "../assets/spritesheets/HC_Humans1A.png";
import enemySprites from "../assets/spritesheets/HC_Zombies1A.png";
import bulletImg from "../assets/images/bullet.png";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";
import PlayerAnimations from "../animations/player";
import EnemyAnimations from "../animations/enemy";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });

    this.currentEnemies = 0;
    this.MAX_ENEMIES = 50;
  }

  preload() {
    this.load.image(
      "tile_images",
      "../src/assets/tilesets/TileA5_PHC_Exterior-General.png"
    );
    this.load.tilemapTiledJSON(
      "tile_map",
      "../src/assets/tilesets/horrormap.json"
    );
    this.load.image("bullet", bulletImg);

    this.load.audio("background_music", "src/assets/audio/Creepy-Action.mp3", "../assets/audio/Creepy-Action.ogg")

    this.load.spritesheet("enemy", enemySprites, {
      frameWidth: 20,
      frameHeight: 32,
      startFrame: 1
    });
    this.load.spritesheet("player", playerSprites, {
      frameWidth: 16,
      frameHeight: 32,
      startFrame: 1
    });
  }

  create() {
    const map = this.make.tilemap({ key: "tile_map" });
    this.tile_images = map.addTilesetImage("horrorset", "tile_images");
    this.bgLayer = map.createDynamicLayer("Tile Layer 1", [this.tile_images]);
    this.buildingLayer = map.createDynamicLayer("Tile Layer 2", [
      this.tile_images
    ]);
    this.buildingLayer.setCollisionBetween(0, 9999);
    //Set music
    var music = this.sound.add("background_music")
    music.play({
      volume: 0.3,
      autoplay: true,
      loop: true
    })

    this.player = new Player({
      scene: this,
      x: this.sys.game.canvas.width / 2,
      y: 300
    });

    this.player.create();
    this.player.body.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;

    this.enemies = this.add.group();
    this.time.addEvent({
      delay: Phaser.Math.Between(250, 300),
      callback: function() {
        if (this.enemies.children.size <= this.MAX_ENEMIES - 1) {
          var enemy = new Enemy({
            scene: this,
            x: Phaser.Math.Between(0, this.sys.game.canvas.width),
            y: Phaser.Math.Between(0, this.sys.game.canvas.height)
          });
          this.enemies.add(enemy);
          this.currentEnemies = this.currentEnemies + 1;
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.enemies, this.buildingLayer);

    // Animations
    let playerAnimations = new PlayerAnimations(this);
    playerAnimations.create();

    let enemyAnimations = new EnemyAnimations(this);
    enemyAnimations.create();

    // Camera
    // set bounds so the camera won't go outside the game world
    this.cameras.main
      .setBounds(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height)
      .setZoom(4);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update();
    this.enemies.children.entries.map(child => child.update());
  }
}

export default GameScene;
