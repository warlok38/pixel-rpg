import {
  END_COLLIDE_WITH_OBJECT,
  HERO_LOOK_AT_OBJECT,
  HERO_STOP_LOOK_AT_OBJECT,
  START_COLLIDE_WITH_OBJECT,
} from "../consts";
import { events } from "../Events";
import { gridCells, gridCellsArray } from "../helpers/grid";
import { CollideObject } from "../objects/CollideObject/CollideObject";
import { Door } from "../objects/Door/Door";
import { Level } from "../objects/Level/Level";
import { Npc } from "../objects/Npc/Npc";
import { resources } from "../resources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { Hero } from "./../objects/Hero/Hero";
import { BalconRoomLevel } from "./BalconRoom";

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

    const chair = new CollideObject({
      name: "chair",
      position: { x: gridCells(18), y: gridCells(9) },
      bodyConfig: {
        resource: resources.images.chair,
        frameSize: new Vector2(12, 23),
        position: new Vector2(1, -8),
      },
    });
    this.addChild(chair);

    const divan = new CollideObject({
      name: "divan",
      position: { x: gridCells(7), y: gridCells(13) },
      bodyConfig: {
        resource: resources.images.divan,
        frameSize: new Vector2(70, 28),
        position: new Vector2(3, -2),
      },
    });
    this.addChild(divan);

    const kombikGreenLight = new CollideObject({
      name: "kombikGreenLight",
      position: { x: gridCells(26), y: gridCells(8) },
      bodyConfig: {
        resource: resources.images.kombikGreenLight,
        frameSize: new Vector2(1, 1),
        position: new Vector2(2, 0),
      },
      drawLayer: "TOP",
    });

    const kombik = new CollideObject({
      name: "kombik",
      position: { x: gridCells(25), y: gridCells(8) },
      bodyConfig: {
        resource: resources.images.kombikOff,
        frameSize: new Vector2(14, 14),
        position: new Vector2(0, -3),
      },
    });
    this.addChild(kombik);

    const guitar = new CollideObject({
      name: "guitar",
      position: { x: gridCells(22), y: gridCells(8) },
      bodyConfig: {
        resource: resources.images.guitar,
        frameSize: new Vector2(5, 24),
        position: new Vector2(6, -11),
      },
      hasCollide: true,
    });
    this.addChild(guitar);

    events.on(START_COLLIDE_WITH_OBJECT, this, (name) => {
      if (guitar.name === name) {
        guitar.sprite.isVisible = false;
        this.addChild(kombikGreenLight);
      }
    });

    events.on(END_COLLIDE_WITH_OBJECT, this, (name) => {
      if (guitar.name === name) {
        guitar.sprite.isVisible = true;
        this.removeChild(kombikGreenLight);
      }
    });

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

    //guitars
    this.renderWalls(gridCellsArray(168, 6), 64);
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
