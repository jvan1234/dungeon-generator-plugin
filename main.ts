namespace SpriteKind {
    export const Chomper = SpriteKind.create()
}
function Generate_Dungeon (length: number, width: number, wall_chance: number) {
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
    list = [
    "north",
    "south",
    "east",
    "west"
    ]
    while (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
        currentPosition = Digger.tilemapLocation()
        console.log("" + currentPosition.column + ", " + currentPosition.row)
        if (Math.percentChance(75) && currentPosition.column < length - 2) {
            tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column + 1, currentPosition.row))
        } else if (Math.percentChance(75) && currentPosition.row < width - 2) {
            tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column, currentPosition.row + 1))
        } else {
            Create_Chomper(sprites.create(assets.image`Chomper`, SpriteKind.Chomper), 4, width - 2, list[randint(0, 1)])
        }
        if (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
            tiles.setTileAt(Digger.tilemapLocation(), sprites.dungeon.darkGroundCenter)
            tiles.setWallAt(Digger.tilemapLocation(), false)
        }
    }
    sprites.destroy(Digger)
}
function Create_Chomper (Chomper: Sprite, length: number, sizeCap: number, direction: string) {
    ChomperSprite = Chomper
    tiles.placeOnTile(ChomperSprite, Digger.tilemapLocation())
    for (let index = 0; index < length; index++) {
        chomperPos = ChomperSprite.tilemapLocation()
        if (direction == "south" && chomperPos.row < sizeCap) {
            tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column, chomperPos.row + 1))
        } else if (direction == "north" && chomperPos.row > 1) {
            tiles.placeOnTile(ChomperSprite, tiles.getTileLocation(chomperPos.column, chomperPos.row - 1))
        }
        if (!(ChomperSprite.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || ChomperSprite.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
            tiles.setTileAt(ChomperSprite.tilemapLocation(), sprites.dungeon.darkGroundCenter)
            tiles.setWallAt(ChomperSprite.tilemapLocation(), false)
        }
    }
    sprites.destroy(ChomperSprite)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    Generate_Dungeon(10, 10, 100)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
})
let chomperPos: tiles.Location = null
let ChomperSprite: Sprite = null
let currentPosition: tiles.Location = null
let list: string[] = []
let Digger: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`noob`, SpriteKind.Player)
Generate_Dungeon(10, 10, 100)
controller.moveSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
scene.cameraFollowSprite(mySprite)
