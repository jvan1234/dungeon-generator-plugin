
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
     * @param length how wide the dungeon will be, in tiles
     * @param width how long the dungeon will be, in tiles
     */
    //% block
    export function Generate_Dungeon(length: number, width: number) {
        tiles.setCurrentTilemap(tilemap`level1`)
        for (let xIndex = 0; xIndex <= length - 1; xIndex++) {
            for (let yIndex = 0; yIndex <= width - 1; yIndex++) {
                tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.darkGroundCenter)
                if (xIndex == 0 || xIndex == length - 1 || (yIndex == 0 || yIndex == width - 1)) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.floorLight0)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), true)
                }
            }
        }
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
