import { DOWN, GRID_SIZE, LEFT, RIGHT, UP } from "./consts";

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  matches(otherVector2) {
    return this.x === otherVector2.x && this.y === otherVector2.y;
  }

  toNeighbor(dir) {
    let x = this.x;
    let y = this.y;
    if (dir === LEFT) {
      x -= GRID_SIZE;
    }
    if (dir === RIGHT) {
      x += GRID_SIZE;
    }
    if (dir === UP) {
      y -= GRID_SIZE;
    }
    if (dir === DOWN) {
      y += GRID_SIZE;
    }
    return new Vector2(x, y);
  }
}
