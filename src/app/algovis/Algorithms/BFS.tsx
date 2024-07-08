import Fringe from "@/app/algovis/models/Fringe";
import Tile, { TileType } from "../models/Tile";

const getNextBoard = (
  algo: String,
  grid: Tile[][], 
  fringe: Fringe
): Tile[][] => {

  const clone = structuredClone(grid);
  
  const pushNeighbours = (node: Tile) => {
    if (node.y > 0 ) fringe.add(algo, clone[node.y-1][node.x], node);
    if (node.x > 0 ) fringe.add(algo, clone[node.y][node.x-1], node);
    if (node.y < grid.length-1 ) fringe.add(algo, clone[node.y+1][node.x], node);
    if (node.x < grid[0].length-1 ) fringe.add(algo, clone[node.y][node.x+1], node);
  };
  
  // FRINGE EMPTY
  if (fringe.length() < 1) return grid;


  // POP NEXT NODE
  var expand = fringe.pop()!;

  // IF IS WALL DO NOTHING
  if (expand.tileType == TileType.Wall) return grid;

  // // IF IS START, EXAPND AND CONTINUE
  if (expand.tileType == TileType.Start) {
    pushNeighbours(expand);
    if (clone[expand.y][expand.x].tileType != TileType.Start) {
      clone[expand.y][expand.x].tileType = TileType.Visited;
    } 
    expand = fringe.pop()!;
  }

  // IF IS FINISH, SET TO VISITED, CLEAR FRINGE
  if (expand.tileType == TileType.Finish) {
    expand.tileType = TileType.Visited;
    fringe.empty();
    return clone
  }

  // SET BOARD ACCORDINGLY
  if (clone[expand.y][expand.x].tileType != TileType.Start) {
    clone[expand.y][expand.x].tileType = TileType.Visited;
  } 
  
  // UPDATE FRINGE
  pushNeighbours(expand);

  // RETURN DEEP COPY OF BOARD
  return clone
}

export default getNextBoard;