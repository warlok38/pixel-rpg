import { GameObject } from "./GameObject";
import { events } from "./Events";
import { Vector2 } from "./Vector2";
import { HERO_POSITION } from "./consts";

export class Camera extends GameObject {
  constructor() {
    super({});

    events.on(HERO_POSITION, this, ({ position }) => {
      this.centerPositionOnTarget(position);
    });

    events.on("CHANGE_LEVEL", this, (newMap) => {
      this.centerPositionOnTarget(newMap.heroStartPosition);
    });
  }

  centerPositionOnTarget(position) {
    const personHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -personHalf + canvasWidth / 2;
    const halfHeight = -personHalf + canvasHeight / 2;

    this.position = new Vector2(
      -position.x + halfWidth,
      -position.y + halfHeight
    );
  }
}
