function Generate_Dungeon (length: number, width: number) {
    tiles.setCurrentTilemap(tilemap`level1`)
    for (let xIndex = 0; xIndex <= length; xIndex++) {
        for (let yIndex = 0; yIndex <= width; yIndex++) {
            tiles.setTileAt(tiles.getTileLocation(xIndex, yIndex), sprites.dungeon.floorLight0)
        }
    }
}

