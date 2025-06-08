import { events } from "../Events";
import { gridCells, gridCellsArray } from "../helpers/grid";
import { Door } from "../objects/Door/Door";
import { Level } from "../objects/Level/Level";
import { Npc } from "../objects/Npc/Npc";
import { resources } from "../resources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { Hero } from "./../objects/Hero/Hero";
import { BalconRoomLevel } from "./BalconRoom";
import { CaveLevel1 } from "./CaveLevel1";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(12), gridCells(10));
const DOOR_POSITION_LEFT = "Left";

export class MainRoomLevel extends Level {
  constructor(params = {}) {
    super({});
    this.background = new Sprite({
      resource: resources.images.mainRoomBackground,
      frameSize: new Vector2(320, 180),
    });

    const groundSprite = new Sprite({
      resource: resources.images.mainRoom,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groundSprite);

    const door = new Door(gridCells(7), gridCells(11), DOOR_POSITION_LEFT);
    this.addChild(door);

    this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
    this.heroStartFacingDirection = params.facingDirection;
    const hero = new Hero(
      this.heroStartPosition.x,
      this.heroStartPosition.y,
      this.heroStartFacingDirection
    );
    this.addChild(hero);

    const whiteCat = new Npc(
      gridCells(18),
      gridCells(14),
      {
        resource: resources.images.whiteCat,
        frameSize: new Vector2(21, 12),
        hFrames: 2,
        vFrames: 1,
        position: new Vector2(-1, -1),
      },
      undefined,
      {
        content: [
          {
            string: "mrrrrrrrr...",
          },
        ],
        portraitFrame: 2,
      }
    );
    this.addChild(whiteCat);

    const grayCat = new Npc(
      gridCells(30),
      gridCells(13),
      {
        resource: resources.images.grayCat,
        frameSize: new Vector2(18, 13),
        hFrames: 2,
        vFrames: 1,
        position: new Vector2(1, 0),
      },
      undefined,
      {
        content: [
          {
            string: "Mrr?",
            requires: ["GRAY_CAT_1"],
          },
          {
            string: "MIAU!",
            addsFlag: "GRAY_CAT_1",
          },
        ],
        portraitFrame: 3,
      }
    );
    this.addChild(grayCat);

    const chair = new Npc(gridCells(18), gridCells(9), {
      resource: resources.images.chair,
      frameSize: new Vector2(12, 23),
      hFrames: 2,
      vFrames: 1,
      position: new Vector2(1, -8),
    });
    this.addChild(chair);

    this.walls = new Set();

    //The frame is 8px. So: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 etc

    //vertical walls
    this.renderWalls(48, gridCellsArray(64, 8));
    this.renderWalls(256, gridCellsArray(64, 8));

    //horizontal walls
    this.renderWalls(gridCellsArray(48, 26), 56);
    this.renderWalls(gridCellsArray(48, 26), 128);

    //sofa
    this.renderWalls(gridCellsArray(48, 4), 104);
    this.renderWalls(gridCellsArray(48, 9), 112);
    this.renderWalls(gridCellsArray(48, 10), 120);
    //chair
    this.renderWalls([136, 144], 72);
    //guitars
    this.renderWalls(gridCellsArray(168, 6), 64);
    //cat gray
    this.renderWalls([232, 240], 104);
    //cat white
    this.renderWalls(gridCellsArray(136, 3), 112);
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
        new BalconRoomLevel({
          heroPosition: new Vector2(gridCells(30), gridCells(11)),
          facingDirection: DOOR_POSITION_LEFT.toUpperCase(),
        })
      );
    });
  }
}
