import { events } from "../../Events";
import { resources } from "../../resources";
import { Vector2 } from "../../Vector2";
import { GameObject } from "./../../GameObject";
import { Sprite } from "./../../Sprite";

export class Exit extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    this.addChild(
      new Sprite({
        resource: resources.images.exit,
      })
    );

    this.drawLayer = "FLOOR";
  }

  ready() {
    events.on("HERO_POSITION", this, ({ position }) => {
      const roundedHeroX = Math.round(position.x);
      const roundedHeroY = Math.round(position.y);

      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        events.emit("HERO_EXITS");
      }
    });
  }
}
