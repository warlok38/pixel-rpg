class Resources {
  constructor() {
    this.toLoad = {
      hero: "/sprites/me-hero-sheet.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      exit: "/sprites/exit.png",
      doorOpenLeft: "/sprites/door-open-left.png",
      doorOpenRight: "/sprites/door-open-right.png",
      doorClosedLeft: "/sprites/door-closed-left.png",
      doorClosedRight: "/sprites/door-closed-right.png",

      //levels
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      cave: "/sprites/cave.png",
      caveGround: "/sprites/cave-ground.png",

      mainRoom: "/sprites/main-room.png",
      mainRoomBackground: "/sprites/main-room-background.png",
      balconRoom: "/sprites/balcon-room.png",

      //npc
      knight: "/sprites/knight-sheet-1.png",
      unknownNPC: "/sprites/unknown-npc.png",
      whiteCat: "/sprites/white-cat.png",
      grayCat: "/sprites/gray-cat.png",

      //collideobjects
      notFoundObject: "/sprites/not-found-object.png",
      chair: "/sprites/chair.png",
      guitar: "/sprites/guitar.png",
      kombikOff: "/sprites/kombik-off.png",
      kombikGreenLight: "/sprites/kombik-green-light.png",
      divan: "/sprites/divan.png",
      perila: "/sprites/perila.png",

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
