import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    preload() {
        this.load.image("groundTiles", "../src/assets/tilesets/galletcity_tiles.png");
        this.load.tilemapTiledJSON('crossroads', '../src/assets/tilesets/tilemap.json');
    }
    create() {
        const map = this.make.tilemap({ key: 'crossroads' });
        const groundTiles = map.addTilesetImage('TestTileset', 'groundTiles');

        map.createDynamicLayer('Tile Layer 1', [groundTiles]);

    }
}

export default GameScene;
