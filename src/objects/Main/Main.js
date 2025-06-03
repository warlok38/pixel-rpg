import { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import { storyFlags } from "../../StoryFlags";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString";
import { Inventory } from "./../Inventory/Inventory";

export class Main extends GameObject {
  constructor() {
    super({});
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
  }

  ready() {
    const inventory = new Inventory();
    this.addChild(inventory);

    events.on("CHANGE_LEVEL", this, (newLevelInstance) => {
      this.setLevel(newLevelInstance);
    });

    events.on("HERO_REQUESTS_ACTION", this, (withObject) => {
      if (typeof withObject.getContent === "function") {
        const content = withObject.getContent();

        if (!content) {
          return;
        }

        if (content.addsFlag) {
          storyFlags.add(content.addsFlag);
        }

        const textBox = new SpriteTextString({
          portraitFrame: content.portraitFrame,
          string: content.string,
        });

        this.addChild(textBox);
        events.emit("START_TEXT_BOX");

        const endingSub = events.on("END_TEXT_BOX", this, () => {
          textBox.destroy();
          events.off(endingSub);
        });
      }
    });
  }

  setLevel(newLevelInstance) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = newLevelInstance;
    this.addChild(this.level);
  }

  drawBackground(context) {
    this.level?.background.drawImage(context, 0, 0);
  }

  drawObjects(context) {
    this.children.forEach((child) => {
      if (child.drawLayer !== "HUD") {
        child.draw(context, 0, 0);
      }
    });
  }

  drawForeground(context) {
    this.children.forEach((child) => {
      if (child.drawLayer === "HUD") {
        child.draw(context, 0, 0);
      }
    });
  }
}
