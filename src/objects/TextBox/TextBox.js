import { GameObject } from "../../GameObject";
import { resources } from "../../resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class TextBox extends GameObject {
  constructor() {
    super({
      position: new Vector2(32, 112),
    });
    this.content = "Hi. Hellow world! Hi. Hellow world!";
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    });
  }

  drawImage(context, drawPosX, drawPosY) {
    this.backdrop.drawImage(context, drawPosX, drawPosY);

    context.font = "14px fontRetroGaming";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#fff";

    const MAX_WIDTH = 250;
    const LINE_HEIGHT = 20;
    const PADDING_LEFT = 10;
    const PADDING_TOP = 12;

    let words = this.content.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > MAX_WIDTH && n > 0) {
        context.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
        line = words[n] + " ";
        drawPosY += LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, drawPosX + PADDING_LEFT, drawPosY + PADDING_TOP);
  }
}
