import { DOWN, LEFT, RIGHT, UP } from "./consts";

export class Input {
  constructor() {
    this.heldDirections = [];
    this.keys = {};
    this.lastKeys = {};

    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;

      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowPressed(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowPressed(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowPressed(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowPressed(RIGHT);
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;

      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onArrowReleased(UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onArrowReleased(DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onArrowReleased(LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onArrowReleased(RIGHT);
      }
    });
  }

  get direction() {
    return this.heldDirections[0];
  }

  update() {
    this.lastKeys = { ...this.keys };
  }

  getActionJustPressed(keyCode) {
    let justPressed = false;
    if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
      justPressed = true;
    }
    return justPressed;
  }

  onArrowPressed(direction) {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction) {
    const index = this.heldDirections.indexOf(direction);
    if (index === -1) {
      return;
    }
    this.heldDirections.splice(index, 1);
  }
}
