import { GameLoop } from "./src/GameLoop";
import { MainRoomLevel } from "./src/levels/mainRoom";

import { Main } from "./src/objects/Main/Main";

import { Vector2 } from "./src/Vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");

const mainScene = new Main({
  position: new Vector2(0, 0),
});
mainScene.setLevel(new MainRoomLevel());

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
