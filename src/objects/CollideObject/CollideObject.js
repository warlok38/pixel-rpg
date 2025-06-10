import {
  GET_CONTENT_CODES,
  GRID_SIZE,
  HERO_LOOK_AT_OBJECT,
  HERO_POSITION,
  HERO_STOP_LOOK_AT_OBJECT,
} from "../../consts";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

const DEFAULT_BODY_CONFIG = {
  resource: resources.images.notFoundObject,
  frameSize: new Vector2(32, 32),
  position: new Vector2(0, 0),
};

export class CollideObject extends GameObject {
  constructor({
    name,
    position = { x: 0, y: 0 },
    bodyConfig = DEFAULT_BODY_CONFIG,
    shadowConfig,
    drawLayer,
    hasCollide = false,
  }) {
    super({
      position: new Vector2(position.x, position.y),
    });

    this.name = name;
    this.drawLayer = drawLayer;
    this.isSolid = true;
    this.hasCollide = hasCollide;
    this.position = new Vector2(position.x, position.y);

    if (shadowConfig) {
      const shadow = new Sprite(shadowConfig);
      this.addChild(shadow);
    }

    this.sprite = new Sprite({
      ...bodyConfig,
      hasCollide: this.hasCollide,
    });
    this.addChild(this.sprite);
  }

  ready() {
    if (this.hasCollide) {
      events.on(HERO_POSITION, this, ({ position, facingDirection }) => {
        const objAtPosition = this.position.matches(
          position.toNeighbor(facingDirection)
        );

        if (objAtPosition) {
          events.emit(HERO_LOOK_AT_OBJECT, this.name);
          this.prevObjAtPosition = objAtPosition;
          return;
        }

        if (
          this.prevObjAtPosition &&
          this.prevObjAtPosition !== objAtPosition
        ) {
          events.emit(HERO_STOP_LOOK_AT_OBJECT, this.name);
          this.prevObjAtPosition = undefined;
          return;
        }
      });
    }
  }

  getContent() {
    return {
      name: this.name,
      code: GET_CONTENT_CODES.collideObject,
      hasCollide: this.hasCollide,
    };
  }
}
