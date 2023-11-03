
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/



/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace dungeons {
    /**
     * TODO: This code generates a rectangle given parameters
     * @param length how wide the dungeon will be, in tiles, eg: 10
     * @param width how long the dungeon will be, in tiles, eg: 10
     */
    //% block
    
    export function Generate_Dungeon(length: number, width: number, wall_chance: number) {
        let Digger: Sprite = null
        let currentPosition: tiles.Location = null
        tiles.setCurrentTilemap(tilemap`level1`)
        for (let xIndex = 0; xIndex <= length - 1; xIndex++) {
            for (let yIndex = 0; yIndex <= width - 1; yIndex++) {
                tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.darkGroundCenter)
                if (Math.percentChance(wall_chance) || (xIndex == 0 || xIndex == length - 1 || (yIndex == 0 || yIndex == width - 1))) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.floorLight0)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), true)
                }
                if (xIndex == 1 && yIndex == 1) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.stairLarge)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), false)
                } else if (xIndex == length - 2 && yIndex == width - 2) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.collectibleInsignia)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), false)
                }
            }
        }
        Digger = sprites.create(assets.image`shovel`, SpriteKind.Player)
        tiles.placeOnTile(Digger, tiles.getTileLocation(1, 1))
        while (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
            currentPosition = Digger.tilemapLocation()
            console.log("" + currentPosition.column + ", " + currentPosition.row)
            if (Math.percentChance(50) && currentPosition.column < length - 2) {
                tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column + 1, currentPosition.row))
            } else if (Math.percentChance(100) && currentPosition.row < width - 2) {
                tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column, currentPosition.row + 1))
            }
            if (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
                tiles.setTileAt(Digger.tilemapLocation(), sprites.dungeon.darkGroundCenter)
                tiles.setWallAt(Digger.tilemapLocation(), false)
            }
        }
        sprites.destroy(Digger)
    }
}
