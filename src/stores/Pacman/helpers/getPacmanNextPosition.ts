import { Directions } from "../../Game/Game.types";




export const getPacmanNextPosition = (options: {direction: Directions, row: number, col: number, x: number, y:number }) => {
    const {direction, row, col, x, y} = options;
    
    switch (direction){
        case Directions.Down:
            movementObj.cssPos = "top";
            
            if (directionArray[row+1][col]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = row * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row+1][col]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = y + DISTANCE_INCREMENT;
                movementObj.row = row+1;
                movementObj.column = col;
            }
            movementObj.y = movementObj.cssPosVal;
            break;
        case KEY_UP:
            movementObj.cssPos = "top";
            
            if (directionArray[row-1][col]==0) { 
                // There's a wall in this direction
                movementObj.cssPosVal = row * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row-1][col]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = y - DISTANCE_INCREMENT;
                movementObj.row = row-1;
                movementObj.column = col;
            }
            movementObj.y = movementObj.cssPosVal;
            break;
        case KEY_LEFT:
            movementObj.cssPos = "left";
            
            if (directionArray[row][col-1]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = col * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row][col-1]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = x - DISTANCE_INCREMENT;
                movementObj.row = row;
                movementObj.column = col-1;
            }
            movementObj.x = movementObj.cssPosVal;
            break;
        case KEY_RIGHT:
            movementObj.cssPos = "left";
            
            if (directionArray[row][col+1]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = col * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row][col+1]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = x + DISTANCE_INCREMENT;
                movementObj.row = row;
                movementObj.column = col+1;
            }
            movementObj.x = movementObj.cssPosVal;
            break;
        default:
            // do nothing
            break;
    }
    
}



(dir, row, col, x, y){
    // Returns movement object
    var movementObj = {
        canMove: true,
        cssPosVal: 0,
        cssPos: "lala",
        row: 0,
        column: 0,
        x: 0,
        y: 0
    }

    movementObj.y = y;
    movementObj.x = x;
    movementObj.row = row;
    movementObj.column = col;
    
    gCurrentMoveInterval = INTERVAL_MOVE;
        
    switch (dir){
        case KEY_DOWN:
            movementObj.cssPos = "top";
            
            if (directionArray[row+1][col]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = row * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row+1][col]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = y + DISTANCE_INCREMENT;
                movementObj.row = row+1;
                movementObj.column = col;
            }
            movementObj.y = movementObj.cssPosVal;
            break;
        case KEY_UP:
            movementObj.cssPos = "top";
            
            if (directionArray[row-1][col]==0) { 
                // There's a wall in this direction
                movementObj.cssPosVal = row * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row-1][col]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = y - DISTANCE_INCREMENT;
                movementObj.row = row-1;
                movementObj.column = col;
            }
            movementObj.y = movementObj.cssPosVal;
            break;
        case KEY_LEFT:
            movementObj.cssPos = "left";
            
            if (directionArray[row][col-1]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = col * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row][col-1]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = x - DISTANCE_INCREMENT;
                movementObj.row = row;
                movementObj.column = col-1;
            }
            movementObj.x = movementObj.cssPosVal;
            break;
        case KEY_RIGHT:
            movementObj.cssPos = "left";
            
            if (directionArray[row][col+1]==0) {
                // There's a wall in this direction
                movementObj.cssPosVal = col * WALL_INCREMENT;
                movementObj.canMove = false;
            }else{
                // If the next square has food Pacman moves at normal speed
                if (gJabbaArray[row][col+1]==1){
                    gCurrentMoveInterval = INTERVAL_MOVE;
                    // Tell the main caller that pacman is about to eat a dot so that the count can be updated to win the game
                    movementObj.hasDot = true;
                }
                
                movementObj.cssPosVal = x + DISTANCE_INCREMENT;
                movementObj.row = row;
                movementObj.column = col+1;
            }
            movementObj.x = movementObj.cssPosVal;
            break;
        default:
            // do nothing
            break;
    }
        
    return movementObj;
}
