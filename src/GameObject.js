import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.isSolid = false;
    this.drawLayer = null;
  }

  stepEntry(delta, root) {
    this.children.forEach((child) => child.stepEntry(delta, root));

    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    this.step(delta, root);
  }

  ready() {
    //
  }

  step(_delta) {
    //
  }

  draw(context, x, y) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(context, drawPosX, drawPosY);

    this.getDrawChildrenOrdered().forEach((child) =>
      child.draw(context, drawPosX, drawPosY)
    );
  }

  getDrawChildrenOrdered() {
    return [...this.children].sort((a, b) => {
      if (a.drawLayer === "TOP") {
        return 1;
      }
      if (b.drawLayer === "FLOOR") {
        return 1;
      }

      return a.position.y > b.position.y ? 1 : -1;
    });
  }

  drawImage(context, drawPosX, drawPosY) {}

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });

    this.parent.removeChild(this);
  }

  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => gameObject !== child);
  }
}
