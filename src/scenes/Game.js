import Phaser from "phaser";
import enemyImg from "../assets/images/enemy.png";
import playerImg from "../assets/images/player.png";
import bulletImg from "../assets/images/tile.png";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });

        this.currentEnemies = 0;
        this.MAX_ENEMIES = 5;
    }
    preload() {
        this.load.image("tile_images", "../src/assets/tilesets/TileA5_PHC_Exterior-General.png");
        this.load.tilemapTiledJSON('tile_map', '../src/assets/tilesets/horrormap.json');

        this.load.image("enemy", enemyImg);
        this.load.image("player", playerImg);
        this.load.image("bullet", bulletImg);

    }
    create() {
        const map = this.make.tilemap({ key: 'tile_map' });
        this.tile_images = map.addTilesetImage('horrorset', 'tile_images');
        this.bgLayer = map.createDynamicLayer('Tile Layer 1', [this.tile_images]);
        this.buildingLayer = map.createDynamicLayer('Tile Layer 2', [this.tile_images]);
        this.buildingLayer.setCollisionBetween(0, 9999);


        this.player = new Player({
            scene: this,
            x: this.sys.game.canvas.width / 2,
            y: 300
        });
        this.player.create();
        this.player.body.setCollideWorldBounds(true);
﻿        this.player.onWorldBounds = true;

        this.enemies = this.add.group();
        this.time.addEvent({
            delay: 100,
            callback: function() {
                if (this.currentEnemies <= this.MAX_ENEMIES - 1) {
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

    }
    update() {
        this.player.update();
        this.enemies.children.entries.map(child => child.update());
    }
}

export default GameScene;
