export enum TileType {
  None,
  Start,
  Finish,
  Wall, 
  Path, 
  Visited,
}


export default class TileNode {

  x: number;
  y: number;
  weight: number;
  inFringe: boolean;
  neighbours: TileNode[];
  tileType: TileType;
  parent: TileNode | undefined;

  constructor(x: number, y: number, tileType: TileType = TileType.None) {
    this.x = x;
    this.y = y;
    this.weight = 0;
    this.tileType = tileType;
    this.neighbours = [];
    this.inFringe = false;
  };
};

