import Tile, { TileType }  from "./Tile";

export default class Fringe {

  _items: Tile[] = [];

  setRoot(root: Tile) {
    this._items = [root]
  }

  add(algo: String, node: Tile, parent: Tile): void {
    if (!node.inFringe && node.tileType !== TileType.Visited) {
      if (algo == "DFS") this._items.unshift(node);
      if (algo == "BFS") this._items.push(node);
    }
    node.parent = parent;
    node.inFringe = true;
  }

  pop(): Tile { return this._items.shift()!; }

  length(): number { return this._items.length; } 
  
  empty() { this._items = [] }
  
}