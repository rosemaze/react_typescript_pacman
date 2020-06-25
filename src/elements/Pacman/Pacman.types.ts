export interface Sprite {
  isMoving: boolean;
  id: string;
  stepsRatio: number;
  previousDirection: string;
  currentDirection: string;
  liveDirection: string;
  intervalMover: number;
  row: number;
  column: number;
  x: number;
  y: number;
  steps: number;
}

/*
pacman:{
    isMoving: false,
    id:"pacmanDiv",
    stepsRatio: STEPS_RATIO_RANDOM,
    previousDirection: "",
    currentDirection: "",
    liveDirection: "",
    intervalMover:"",
    row: 23, //15,
    column: 14, //9,
    x:210,
    y:345,
    steps: 0
},
*/
