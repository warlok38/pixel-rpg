import { Camera } from "./src/Camera";
import { events } from "./src/Events";
import { GameLoop } from "./src/GameLoop";
import { GameObject } from "./src/GameObject";
import { gridCells, isSpaceFree } from "./src/helpers/grid";
import { Input } from "./src/Input";
import { Hero } from "./src/objects/Hero/Hero";
import { Inventory } from "./src/objects/Inventory/Inventory";
import { Rod } from "./src/objects/Rod/Rod";
import { resources } from "./src/resources";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();

mainScene.input = new Input();

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  skySprite.drawImage(context, 0, 0);

  context.save();

  context.translate(camera.position.x, camera.position.y);

  mainScene.draw(context, 0, 0);

  context.restore();

  inventory.draw(context, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
