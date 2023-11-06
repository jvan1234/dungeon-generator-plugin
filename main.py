def Generate_Dungeon(length: number, width: number, chomper_chance: number):
    global Digger, directions, go, currentPosition
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    xIndex = 0
    while xIndex <= length - 1:
        yIndex = 0
        while yIndex <= width - 1:
            tiles.set_tile_at(tiles.get_tile_location(xIndex, yIndex),
                sprites.dungeon.floor_light0)
            tiles.set_wall_at(tiles.get_tile_location(xIndex, yIndex), True)
            if xIndex == 1 and yIndex == 1:
                tiles.set_tile_at(tiles.get_tile_location(xIndex, yIndex),
                    sprites.dungeon.stair_large)
                tiles.set_wall_at(tiles.get_tile_location(xIndex, yIndex), False)
            elif xIndex == length - 2 and yIndex == width - 2:
                tiles.set_tile_at(tiles.get_tile_location(xIndex, yIndex),
                    sprites.dungeon.collectible_insignia)
                tiles.set_wall_at(tiles.get_tile_location(xIndex, yIndex), False)
            yIndex += 1
        xIndex += 1
    Digger = sprites.create(assets.image("""
        shovel
    """), SpriteKind.player)
    tiles.place_on_tile(Digger, tiles.get_tile_location(1, 1))
    directions = ["north", "south", "east", "west"]
    while not (Digger.tile_kind_at(TileDirection.CENTER, sprites.dungeon.collectible_insignia)):
        go = randint(0, 3)
        currentPosition = Digger.tilemap_location()
        print("" + str(currentPosition.column) + ", " + str(currentPosition.row))
        if go == 0 and currentPosition.column < length - 2:
            tiles.place_on_tile(Digger,
                tiles.get_tile_location(currentPosition.column + 1, currentPosition.row))
        elif go == 1 and currentPosition.row < width - 2:
            tiles.place_on_tile(Digger,
                tiles.get_tile_location(currentPosition.column, currentPosition.row + 1))
        else:
            if Math.percent_chance(chomper_chance):
                if go == 2:
                    Create_Chomper(sprites.create(assets.image("""
                            Chomper
                        """), SpriteKind.player),
                        4,
                        width - 2,
                        directions[randint(0, 1)])
                else:
                    Create_Chomper(sprites.create(assets.image("""
                            Chomper
                        """), SpriteKind.player),
                        4,
                        width - 2,
                        directions[randint(2, 3)])
        if not (Digger.tile_kind_at(TileDirection.CENTER, sprites.dungeon.stair_large) or Digger.tile_kind_at(TileDirection.CENTER, sprites.dungeon.collectible_insignia)):
            tiles.set_tile_at(Digger.tilemap_location(),
                sprites.dungeon.dark_ground_center)
            tiles.set_wall_at(Digger.tilemap_location(), False)
    sprites.destroy(Digger)
def Create_Chomper(Chomper: Sprite, length2: number, sizeCap: number, direction: str):
    global ChomperSprite, chomperPos
    ChomperSprite = Chomper
    tiles.place_on_tile(ChomperSprite, Digger.tilemap_location())
    for index in range(length2):
        chomperPos = ChomperSprite.tilemap_location()
        if direction == "south" and chomperPos.row < sizeCap:
            tiles.place_on_tile(ChomperSprite,
                tiles.get_tile_location(chomperPos.column, chomperPos.row + 1))
        elif direction == "north" and chomperPos.row > 1:
            tiles.place_on_tile(ChomperSprite,
                tiles.get_tile_location(chomperPos.column, chomperPos.row - 1))
        elif direction == "east" and chomperPos.column < sizeCap:
            tiles.place_on_tile(ChomperSprite,
                tiles.get_tile_location(chomperPos.column + 1, chomperPos.row))
        elif direction == "west" and chomperPos.column > 1:
            tiles.place_on_tile(ChomperSprite,
                tiles.get_tile_location(chomperPos.column - 1, chomperPos.row))
        if not (ChomperSprite.tile_kind_at(TileDirection.CENTER, sprites.dungeon.stair_large) or ChomperSprite.tile_kind_at(TileDirection.CENTER, sprites.dungeon.collectible_insignia)):
            tiles.set_tile_at(ChomperSprite.tilemap_location(),
                sprites.dungeon.dark_ground_center)
            tiles.set_wall_at(ChomperSprite.tilemap_location(), False)
    sprites.destroy(ChomperSprite)
chomperPos: tiles.Location = None
ChomperSprite: Sprite = None
currentPosition: tiles.Location = None
go = 0
directions: List[str] = []
Digger: Sprite = None
Generate_Dungeon(10, 10, 100)