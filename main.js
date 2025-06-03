import { GameLoop } from "./src/GameLoop";
import { CaveLevel1 } from "./src/levels/CaveLevel1";
import { OutdoorLevel1 } from "./src/levels/OutdoorLevel1";

import { Main } from "./src/objects/Main/Main";

import { Vector2 } from "./src/Vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");

const mainScene = new Main({
  position: new Vector2(0, 0),
});
// mainScene.setLevel(new OutdoorLevel1());
mainScene.setLevel(new CaveLevel1());

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
  mainScene.input?.update();
};

const draw = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  mainScene.drawBackground(context);

  context.save();

  if (mainScene.camera) {
    context.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  }

  mainScene.drawObjects(context);

  context.restore();

  mainScene.drawForeground(context);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
