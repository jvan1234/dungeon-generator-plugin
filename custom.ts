
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }
    /**
     * TODO: This code generates a rectangle given parameters
     * @param length how wide the dungeon will be, in tiles
     * @param width how long the dungeon will be, in tiles
     */
    //% block
    export function Generate_Dungeon(length: number, width: number) {
        tiles.setCurrentTilemap(tilemap`level1`)
        for (let xIndex = 0; xIndex <= length; xIndex++) {
            for (let yIndex = 0; yIndex <= width; yIndex++) {
                tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.floorLight0)
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
