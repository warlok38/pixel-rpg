import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import { resources } from "../../resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { getCharacterFrame, getCharacterWidth } from "./spriteFontMap";

export class SpriteTextString extends GameObject {
  constructor(config = {}) {
    super({
      position: new Vector2(32, 108),
    });
    this.drawLayer = "HUD";

    const content = config.string ?? "Default text";

    this.words = content.split(" ").map((word) => {
      let wordWidth = 0;
      const chars = word.split("").map((char) => {
        const charWidth = getCharacterWidth(char);
        wordWidth += charWidth;
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.fontWhite,
            hFrames: 13,
            vFrames: 6,
            frame: getCharacterFrame(char),
          }),
        };
      });

      return {
        wordWidth,
        chars,
      };
    });

    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });

    this.portrait = new Sprite({
      resource: resources.images.portraits,
      hFrames: 4,
      frame: config.portraitFrame ?? 0,
    });

    this.showingIndex = 0;
    this.finalIndex = this.words.reduce(
      (acc, word) => acc + word.chars.length,
      0
    );
    this.textSpeed = 20;
    this.timeUntilNextShow = this.textSpeed;
  }

  step(delta, root) {
    /** @type {Input} */
    const input = root.input;
    if (input?.getActionJustPressed("Space")) {
      if (this.showingIndex < this.finalIndex) {
        this.showingIndex = this.finalIndex;
        return;
      }

      events.emit("END_TEXT_BOX");
    }

    this.timeUntilNextShow -= delta;

    if (this.timeUntilNextShow <= 0) {
      this.showingIndex += 1;
      this.timeUntilNextShow = this.textSpeed;
    }
  }

  drawImage(context, drawPosX, drawPosY) {
    this.backdrop.drawImage(context, drawPosX, drawPosY);

    this.portrait.drawImage(context, drawPosX + 6, drawPosY + 6);

    const PADDING_LEFT = 27;
    const PADDING_TOP = 9;
    const LINE_WIDTH_MAX = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    let cursorX = drawPosX + PADDING_LEFT;
    let cursorY = drawPosY + PADDING_TOP;
    let currentShowingIndex = 0;

    this.words.forEach((word) => {
      const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;

      if (spaceRemaining < word.wordWidth) {
        cursorX = drawPosX + PADDING_LEFT;
        cursorY += LINE_VERTICAL_HEIGHT;
      }

      word.chars.forEach((char) => {
        if (currentShowingIndex > this.showingIndex) {
          return;
        }

        const { sprite, width } = char;
        const withCharOffset = cursorX - 5;

        sprite.draw(context, withCharOffset, cursorY);
        cursorX += width;
        cursorX += 1;

        currentShowingIndex += 1;
      });
      cursorX += 3;
    });
  }
}
