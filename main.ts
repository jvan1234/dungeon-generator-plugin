function Generate_Dungeon (length: number, width: number) {
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
console.log("HELP ME")
Generate_Dungeon(6, 6)
