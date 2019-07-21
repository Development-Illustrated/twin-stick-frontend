import Phaser from "phaser";

// Images
import playerSprites from "../assets/spritesheets/Player.png";
import bulletImg from "../assets/images/bullet.png";
import crosshairImg from "../assets/images/crosshair.png";
import Crosshair from "../sprites/Crosshair";

// Sprites
import Player from "../sprites/Player";
import Swarmer from "../sprites/Swarmer";

// Animators
import PlayerAnimations from "../animations/player";
import EnemyAnimator from "../animations/enemy";

// Config
import { Swarmer as SwarmerConfig } from "../config/zombies";

// Spawner
import ZombieSpawner from "../spawner/zombies";

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });

    this.enemyAnimator = new EnemyAnimator(this);
    this.zombieSpawner = new ZombieSpawner(this);
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
    this.load.image("crosshair", crosshairImg);

    this.load.audio(
      "backgroundMusic",
      "src/assets/audio/Creepy-Action.mp3",
      "../assets/audio/Creepy-Action.ogg"
    );
    this.load.audio(
      "9mmGun",
      "src/assets/audio/weapons/9_mm_gunshot.mp3",
      "src/assets/audio/weapons/9_mm_gunshot.ogg"
    );
    this.load.audio(
      "zombieAttack",
      "src/assets/audio/zombies/Zombie_Attack_Sound.wav",
      "src/assets/audio/zombies/Zombie_Attack_Sound.ogg"
    );

    this.enemyAnimator.preload();

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

    //Add weapon sounds
    this.sound.add("9mmGun");
    
    this.buildingLayer.setCollisionBetween(89, 89);

    this.enemyAnimator.create();

    //Set music
    var backgroundMusic = this.sound.add("backgroundMusic");

    backgroundMusic.play({
      volume: 0.3,
      autoplay: true,
      loop: true
    });

    this.player = new Player({
      scene: this,
      x: this.sys.game.canvas.width / 2,
      y: this.sys.game.canvas.height / 2
    });
    this.player.create();
    this.player.body.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;

    this.crosshair = new Crosshair({
      scene: this,
      x: this.player.x,
      y: this.player.y
    })
    this.crosshair.create()

    this.enemyTypes = {
      swarmer: this.add.group(),
      hunter: this.add.group(),
      charger: this.add.group(),
      spitter: this.add.group(),
      witch: this.add.group()
    };

    this.enemies = this.add.group();
    this.enemyHitboxes = this.add.group();

    this.zombieSpawner.spawn();

    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.enemies, this.buildingLayer);

    // Animations
    let playerAnimations = new PlayerAnimations(this);
    playerAnimations.create();

    // Camera
    // set bounds so the camera won't go outside the game world
    this.cameras.main
      .setBounds(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height)
      .setZoom(4);
    // // make the camera follow the player
    this.cameras.main.startFollow(this.player);
  }

  update() {
    this.player.update();
    this.enemies.children.entries.map(child => child.update());
  }
}

export default GameScene;
