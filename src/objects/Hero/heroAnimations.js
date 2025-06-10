const makeStandingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
    ],
  };
};

const makeWalkingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame - 1,
      },
      {
        time: 100,
        frame: rootFrame,
      },
      {
        time: 200,
        frame: rootFrame - 1,
      },
      {
        time: 300,
        frame: rootFrame + 1,
      },
    ],
  };
};

const makePlayingGuitarFrames = (rootFrame = 0) => {
  return {
    duration: 700,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
      {
        time: 100,
        frame: rootFrame + 1,
      },
      {
        time: 200,
        frame: rootFrame,
      },
      {
        time: 300,
        frame: rootFrame + 2,
      },
      {
        time: 400,
        frame: rootFrame + 3,
      },
      {
        time: 500,
        frame: rootFrame + 4,
      },
      {
        time: 600,
        frame: rootFrame + 3,
      },
      {
        time: 700,
        frame: rootFrame + 5,
      },
    ],
  };
};

export const STAND_DOWN = makeStandingFrames(0);
export const STAND_UP = makeStandingFrames(3);
export const STAND_RIGHT = makeStandingFrames(6);
export const STAND_LEFT = makeStandingFrames(9);

export const WALK_DOWN = makeWalkingFrames(1);
export const WALK_UP = makeWalkingFrames(4);
export const WALK_RIGHT = makeWalkingFrames(7);
export const WALK_LEFT = makeWalkingFrames(10);

export const PLAY_GUITAR = makePlayingGuitarFrames(15);

export const PICK_UP_DOWN = {
  duration: 400,
  frames: [
    {
      time: 0,
      frame: 12,
    },
  ],
};
