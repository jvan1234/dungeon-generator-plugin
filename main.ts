namespace SpriteKind {
    export const Chomper = SpriteKind.create()
}
let Digger: Sprite = null
let currentPosition: tiles.Location = null
let mySprite: Sprite = null
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
    while (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
        currentPosition = Digger.tilemapLocation()
        console.log("" + currentPosition.column + ", " + currentPosition.row)
        if (Math.percentChance(75) && currentPosition.column < length - 2) {
            tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column + 1, currentPosition.row))
        } else if (Math.percentChance(75) && currentPosition.row < width - 2) {
            tiles.placeOnTile(Digger, tiles.getTileLocation(currentPosition.column, currentPosition.row + 1))
        } else {
            Create_Chomper(sprites.create(assets.image`Chomper`, SpriteKind.Chomper), 4, "south")
        }
        if (!(Digger.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge) || Digger.tileKindAt(TileDirection.Center, sprites.dungeon.collectibleInsignia))) {
            tiles.setTileAt(Digger.tilemapLocation(), sprites.dungeon.darkGroundCenter)
            tiles.setWallAt(Digger.tilemapLocation(), false)
        }
    }
    sprites.destroy(Digger)
}
function Create_Chomper (Chomper: Sprite, length: number, direction: string) {
    mySprite = Chomper
}
