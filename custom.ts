
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/



/**
 * Custom blocks
 */
//% weight=100 color=#8B8B8B icon="╬"
namespace dungeons {
    /**
     * TODO: This code generates a rectangle given parameters
     * @param length how wide the dungeon will be, in tiles, eg: 10
     * @param width how long the dungeon will be, in tiles, eg: 10
     * @param chomper_chance how likely a new path will be created, in %, eg: 50
     */
    //% block
    
    export function Generate_Dungeon(length: number, width: number, chomper_chance: number) {
        let yIndex: number;

        tiles.setCurrentTilemap(tilemap`level1`)
        let xIndex = 0
        while (xIndex <= length - 1) {
            yIndex = 0
            while (yIndex <= width - 1) {
                tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.floorLight0)
                tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), true)
                if (xIndex == 1 && yIndex == 1) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.stairLarge)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), false)
                } else if (xIndex == length - 2 && yIndex == width - 2) {
                    tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.collectibleInsignia)
                    tiles.setWallAt(tiles.getTileLocation(xIndex, yIndex), false)
                }

                yIndex += 1
            }
            xIndex += 1
        }
        let Digger: Sprite = null
        Digger = sprites.create(assets.image`
        shovel
    `, SpriteKind.Player)
        tiles.placeOnTile(Digger, tiles.getTileLocation(1, 1))
        let directions = ["north", "south", "east", "west"]
        let go = 0
        let currentPosition: tiles.Location = null
        while (!Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia)) {
            go = randint(0, 3)
            currentPosition = Digger.tilemapLocation()
            console.log("" + ("" + currentPosition.column) + ", " + ("" + currentPosition.row))
            if (go == 0 && currentPosition.column < length - 2) {
                tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column + 1, currentPosition.row))
            } else if (go == 1 && currentPosition.row < width - 2) {
                tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column, currentPosition.row + 1))
            } else if (Math.percentChance(chomper_chance)) {
                if (go == 2) {
                    Create_Chomper(sprites.create(assets.image`Chomper`, SpriteKind.Player), 4, width - 2, directions[randint(0, 1)], currentPosition.column, currentPosition.row);
                } else {
                    Create_Chomper(sprites.create(assets.image`Chomper`, SpriteKind.Player), 4, width - 2, directions[randint(2, 3)], currentPosition.column, currentPosition.row);
                }

            }

            if (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
                tiles.setTileAt(Digger.tilemapLocation(), sprites.dungeon.darkGroundCenter)
                tiles.setWallAt(Digger.tilemapLocation(), false)
            }

        }
        sprites.destroy(Digger)
    }

    function Create_Chomper(Chomper: Sprite, length2: number, sizeCap: number, direction: string, startPosX: number, startPosY: number) {
        let chomperPos: tiles.Location = null
        let ChomperSprite: Sprite = null
        ChomperSprite = Chomper
        tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(startPosX, startPosY))
        for (let index = 0; index < length2; index++) {
            chomperPos = ChomperSprite.tilemapLocation()
            if (direction == "south" && chomperPos.row < sizeCap) {
                tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column, chomperPos.row + 1))
            } else if (direction == "north" && chomperPos.row > 1) {
                tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column, chomperPos.row - 1))
            } else if (direction == "east" && chomperPos.column < sizeCap) {
                tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column + 1, chomperPos.row))
            } else if (direction == "west" && chomperPos.column > 1) {
                tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column - 1, chomperPos.row))
            }

            if (!(ChomperSprite.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || ChomperSprite.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
                tiles.setTileAt(ChomperSprite.tilemapLocation(), sprites.dungeon.darkGroundCenter)
                tiles.setWallAt(ChomperSprite.tilemapLocation(), false)
            }

        }
        sprites.destroy(ChomperSprite)
    }

    
    
    
    
    
    
}
