import Phaser from "phaser";
import enemyImg from "../assets/images/enemy.png";
import playerImg from "../assets/images/player.png";
import Player from "../sprites/Player";
import Enemy from "../sprites/Enemy";

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });

        this.currentEnemies = 0;
        this.MAX_ENEMIES = 0;
    }
    preload() {
        this.load.image("groundTiles", "../src/assets/tilesets/TileA5_PHC_Exterior-General.png");
        this.load.tilemapTiledJSON('crossroads', '../src/assets/tilesets/horrormap.json');

        this.load.image("enemy", enemyImg);
        this.load.image("player", playerImg);

    }
    create() {
        const map = this.make.tilemap({ key: 'crossroads' });
        const groundTiles = map.addTilesetImage('horrorset', 'groundTiles');
        this.bgLayer = map.createDynamicLayer('Tile Layer 1', [groundTiles]);
        this.wallsLayer = map.createDynamicLayer('Tile Layer 2', [groundTiles]);
        map.setCollisionByExclusion([0], true, this.wallsLayer);


        this.player = new Player({
            scene: this,
            x: this.sys.game.canvas.width / 2,
            y: 300
        });
        this.player.create();

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

    }
    update() {
        this.player.update();
        this.enemies.children.entries.map(child => child.update());
    }
}

export default GameScene;
