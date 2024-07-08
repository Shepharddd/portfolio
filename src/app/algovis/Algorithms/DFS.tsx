// import Fringe from "@/app/algovis/models/Fringe";
// import Tile  from "@/app/algovis/models/Tile";

// export const getNextBoardBFS = (board: Tile[][], fringe: Fringe): Tile[][] => {

//   // FRINGE EMPTY
//   if (fringe.length() < 1) return board

//   // POP NEXT NODE
//   var expand = fringe.pop()!;

//   // IF IS WALL DO NOTHING
//   if (expand.isWall) return board;

//   // IF IS START, EXAPND AND CONTINUE
//   if (expand.isStart) {
//     fringe.pushNeighbours(expand);
//     board[expand.y][expand.x].visited = true;
//     expand = fringe.pop()!;
//   }

//   // IF IS FINISH, SET TO VISITED, CLEAR FRINGE
//   if (expand.isFinish) {
//     expand.visited = true;
//     fringe.empty();
//     return board
//   }

//   // SET BOARD ACCORDINGLY
//   board[expand.y][expand.x].visited = true;
  
//   // UPDATE FRINGe
//   fringe.pushNeighbours(expand);

//   // RETURN DEEP COPY OF BOARD
//   return [...board]
// }

