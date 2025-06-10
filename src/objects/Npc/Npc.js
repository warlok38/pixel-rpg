import { GET_CONTENT_CODES, TEXT_CONTENT_NONE } from "../../consts";
import { GameObject } from "../../GameObject";
import { resources } from "../../resources";
import { Sprite } from "../../Sprite";
import { storyFlags } from "../../StoryFlags";
import { Vector2 } from "../../Vector2";

const defaultTextConfig = {
  content: [{ string: TEXT_CONTENT_NONE }],
  portraitFrame: resources.images.portraits[0],
};

export class Npc extends GameObject {
  constructor(x, y, bodyConfig, shadowConfig, textConfig = defaultTextConfig) {
    super({
      position: new Vector2(x, y),
    });

    this.isSolid = true;

    this.textContent = textConfig.content;
    this.textPortraitFrame = textConfig.portraitFrame;

    if (shadowConfig) {
      const shadow = new Sprite(shadowConfig);
      this.addChild(shadow);
    }

    const body = new Sprite(
      bodyConfig || {
        resource: resources.images.unknownNPC,
        frameSize: new Vector2(32, 32),
        hFrames: 2,
        vFrames: 1,
        position: new Vector2(0, 0),
      }
    );
    this.addChild(body);
  }

  getContent() {
    const match = storyFlags.getRelevantScenario(this.textContent);

    if (!match) {
      console.warn("No matches found in this list: ", this.textContent);
      return null;
    }

    return {
      code: GET_CONTENT_CODES.npc,
      portraitFrame: this.textPortraitFrame,
      string: match.string,
      addsFlag: match.addsFlag ?? null,
    };
  }
}
