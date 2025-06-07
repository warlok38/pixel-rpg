import { events } from "../../Events";
import { resources } from "../../resources";
import { Vector2 } from "../../Vector2";
import { GameObject } from "./../../GameObject";
import { Sprite } from "./../../Sprite";

export class Door extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    this.addChild(
      new Sprite({
        resource: resources.images.doorClosed,
        frameSize: new Vector2(2, 27),
        position: new Vector2(1, -15),
        vFrames: 2,
      })
    );
  }

  ready() {
    events.on("HERO_POSITION", this, (pos) => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);

      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        events.emit("HERO_EXITS");
        // events.emit("HERO_NEAR_TO_DOOR");
        // console.log(HERO_NEAR_TO_DOOR);
      }
    });
  }
}
