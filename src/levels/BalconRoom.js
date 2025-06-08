import { events } from "../Events";
import { gridCells, gridCellsArray } from "../helpers/grid";
import { Door } from "../objects/Door/Door";
import { Level } from "../objects/Level/Level";
import { Npc } from "../objects/Npc/Npc";
import { resources } from "../resources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { Hero } from "./../objects/Hero/Hero";
import { CaveLevel1 } from "./CaveLevel1";
import { MainRoomLevel } from "./mainRoom";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(30), gridCells(11));
const DOOR_POSITION_RIGHT = "Right";

export class BalconRoomLevel extends Level {
  constructor(params = {}) {
    super({});
    this.background = new Sprite({
      resource: resources.images.mainRoomBackground,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      resource: resources.images.balconRoom,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const door = new Door(gridCells(31), gridCells(11), DOOR_POSITION_RIGHT);
    this.addChild(door);

    this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
    this.heroStartFacingDirection = params.facingDirection;
    const hero = new Hero(
      this.heroStartPosition.x,
      this.heroStartPosition.y,
      this.heroStartFacingDirection
    );
    this.addChild(hero);

    this.walls = new Set();

    //The frame is 8px. So: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 etc

    //vertical walls
    this.renderWalls(216, gridCellsArray(64, 8));
    this.renderWalls(256, gridCellsArray(64, 8));

    //horizontal walls
    this.renderWalls(gridCellsArray(48, 26), 56);
    this.renderWalls(gridCellsArray(48, 26), 128);
  }

  renderWalls(x, y) {
    if (typeof x === "number" && typeof y === "number") {
      this.walls.add(`${x},${y}`);
      return;
    }

    if (Array.isArray(x) && x.length > 0) {
      x.forEach((xValue) => {
        this.walls.add(`${xValue},${y}`);
      });
      return;
    }

    if (Array.isArray(y) && y.length > 0) {
      y.forEach((yValue) => {
        this.walls.add(`${x},${yValue}`);
      });
      return;
    }

    throw Error("Wrong arguments in renderWalls()");
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new MainRoomLevel({
          heroPosition: new Vector2(gridCells(8), gridCells(11)),
          facingDirection: DOOR_POSITION_RIGHT.toUpperCase(),
        })
      );
    });
  }
}
