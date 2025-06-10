export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export const GRID_SIZE = 8;

export const TEXT_CONTENT_NONE = "...";

export const GET_CONTENT_CODES = {
  npc: "npc",
  collideObject: "collideObject",
} as const;

//event names
export const START_COLLIDE_WITH_OBJECT = "START_COLLIDE_WITH_OBJECT";
export const END_COLLIDE_WITH_OBJECT = "END_COLLIDE_WITH_OBJECT";
export const HERO_POSITION = "HERO_POSITION";
export const HERO_LOOK_AT_OBJECT = "HERO_LOOK_AT_OBJECT";
export const HERO_STOP_LOOK_AT_OBJECT = "HERO_STOP_LOOK_AT_OBJECT";
