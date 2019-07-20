import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }
    preload() {
        this.load.image("groundTiles", "../src/assets/tilesets/TileA5_PHC_Exterior-General.png");
        this.load.tilemapTiledJSON('crossroads', '../src/assets/tilesets/horrormap.json');
    }
    create() {
        const map = this.make.tilemap({ key: 'crossroads' });
        const groundTiles = map.addTilesetImage('horrorset', 'groundTiles');
        this.bgLayer = map.createDynamicLayer('Tile Layer 1', [groundTiles]);
        this.wallsLayer = map.createDynamicLayer('Tile Layer 2', [groundTiles]);
        map.setCollisionByExclusion([0], true, this.wallsLayer);

    }
}

export default GameScene;
