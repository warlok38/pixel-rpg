class Resources {
  constructor() {
    this.toLoad = {
      hero: "/sprites/me-hero-sheet.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      exit: "/sprites/exit.png",
      doorOpen: "/sprites/door-open.png",
      doorClosed: "/sprites/door-closed.png",

      //levels
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      cave: "/sprites/cave.png",
      caveGround: "/sprites/cave-ground.png",

      mainRoom: "/sprites/main-room.png",
      mainRoomBackground: "/sprites/main-room-background.png",

      //npc
      knight: "/sprites/knight-sheet-1.png",
      unknownNPC: "/sprites/unknown-npc.png",
      whiteCat: "/sprites/white-cat.png",
      grayCat: "/sprites/gray-cat.png",
      //npcObject
      chair: "/sprites/chair.png",

      //hud
      textBox: "/sprites/text-box.png",
      fontWhite: "/sprites/sprite-font-white.png",
      portraits: "/sprites/portraits-sheet.png",
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
