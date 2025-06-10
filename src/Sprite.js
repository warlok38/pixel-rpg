import { HERO_LOOK_AT_OBJECT, HERO_STOP_LOOK_AT_OBJECT } from "./consts";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Sprite extends GameObject {
  constructor({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animations,
    showHitbox,
    hasCollide,
    isVisible = true,
  }) {
    super({});
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations ?? null;
    this.showHitbox = showHitbox ?? false;
    this.hasCollide = hasCollide ?? false;
    this.isVisible = isVisible;
    this.buildFrameMap();

    if (hasCollide) {
      events.on(HERO_LOOK_AT_OBJECT, this, (name) => {
        if (this.resource.image.src.includes(name)) {
          this.showHitbox = true;
        }
      });

      events.on(HERO_STOP_LOOK_AT_OBJECT, this, (name) => {
        if (this.resource.image.src.includes(name)) {
          this.showHitbox = false;
        }
      });
    }
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  step(delta) {
    if (!this.animations) {
      return;
    }
    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(context, x, y) {
    if (!this.resource || !this.resource.isLoaded || !this.isVisible) {
      return;
    }

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    const drawWidth = frameSizeX * this.scale;
    const drawHeight = frameSizeY * this.scale;

    context.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      drawWidth,
      drawHeight
    );

    if (this.showHitbox) {
      this.drawHitbox(context, x, y, drawWidth, drawHeight);
    }
  }

  drawHitbox(context, x, y, width, height) {
    context.save();
    context.shadowColor = "#fff";
    context.shadowBlur = 1;
    context.lineJoin = "round";
    context.lineWidth = 0.5;
    context.strokeStyle = "#B3FB9F";
    context.strokeRect(x - 0.5, y - 0.5, width + 1, height + 1);
    context.restore();
  }
}
