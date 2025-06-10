import { HERO_POSITION } from "../../consts";
import { events } from "../../Events";
import { resources } from "../../resources";
import { Vector2 } from "../../Vector2";
import { GameObject } from "./../../GameObject";
import { Sprite } from "./../../Sprite";

export class Door extends GameObject {
  constructor(x, y, direction = "Left") {
    super({
      position: new Vector2(x, y),
    });
    this.facingDirection = direction.toUpperCase();
    this.positionMap = {
      LEFT: new Vector2(1, -15),
      RIGHT: new Vector2(16, -15),
    };
    this.addChild(
      new Sprite({
        resource: resources.images[`doorClosed${direction}`],
        frameSize: new Vector2(2, 27),
        position:
          this.positionMap?.[direction.toUpperCase()] || new Vector2(0, 0),
        vFrames: 2,
      })
    );
  }

  ready() {
    events.on(HERO_POSITION, this, ({ position, facingDirection }) => {
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (
        facingDirection === this.facingDirection &&
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        events.emit("HERO_EXITS");
      }
    });
  }
}
