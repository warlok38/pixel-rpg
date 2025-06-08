import { Animations } from "../../Animations";
import { DOWN, GRID_SIZE, LEFT, RIGHT, UP } from "../../consts";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { Input } from "../../Input";
import { resources } from "../../resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./heroAnimations";

export class Hero extends GameObject {
  constructor(x, y, facingDirection) {
    super({
      position: new Vector2(x, y),
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-6, -20),
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-6, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });
    this.addChild(this.body);

    this.facingDirection = facingDirection || DOWN;
    this.destinationPosition = this.position.duplicate();
    this.itemPickupTime = 0;
    this.itemPickupShell = null;
    this.isLocked = false;

    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      this.onPickUpItem(data);
    });
  }

  ready() {
    events.on("START_TEXT_BOX", this, () => {
      this.isLocked = true;
    });
    events.on("END_TEXT_BOX", this, () => {
      this.isLocked = false;
    });
  }

  step(delta, root) {
    if (this.isLocked) {
      return;
    }

    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    /** @type {Input} */
    const input = root.input;
    if (input?.getActionJustPressed("Space")) {
      const objAtPosition = this.parent.children.find((child) => {
        return child.position.matches(
          this.position.toNeighbor(this.facingDirection)
        );
      });

      if (objAtPosition) {
        events.emit("HERO_REQUESTS_ACTION", objAtPosition);
      }
    }

    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;

    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", {
      position: this.position,
      facingDirection: this.facingDirection,
    });
  }

  tryMove(root) {
    const { input } = root;
    if (!input.direction) {
      if (this.facingDirection === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DOWN) {
        this.body.animations.play("standDown");
      }

      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    if (input.direction === DOWN) {
      nextY += GRID_SIZE;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= GRID_SIZE;
      this.body.animations.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= GRID_SIZE;
      this.body.animations.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += GRID_SIZE;
      this.body.animations.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    const spaceIsFree = isSpaceFree(root.level?.walls, nextX, nextY);
    const solidBodyAtSpace = this.parent.children.find((child) => {
      return (
        child.isSolid &&
        child.position.x === nextX &&
        child.position.y === nextY
      );
    });

    if (spaceIsFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  onPickUpItem({ image, position }) {
    this.destinationPosition = position.duplicate();

    this.itemPickupTime = 500;

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(
      new Sprite({
        resource: image,
        position: new Vector2(0, -18),
      })
    );
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
    this.body.animations.play("pickUpDown");

    if (this.itemPickupTime <= 0) {
      this.itemPickupShell.destroy();
    }
  }
}
