import React, { Dispatch, DispatchWithoutAction, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import Fringe from '@/app/algovis/models/Fringe';
import getNextBoard from '../../Algorithms/BFS';
import Tile, { TileType } from '../../models/Tile';
import TileNode from '../../models/Tile';
import './Board.css'
/**
 * 
 * https://www.framer.com/motion/ 
 * 
 */

interface BoardProps {
  stepCount: number;
  width: number;
  height: number;
  fringe: MutableRefObject<Fringe>;
  algo: String;
}

export const Board: React.FC<BoardProps> = ({
  stepCount, 
  width, 
  height,
  fringe,
  algo
}) => {

  const end = useRef([width-1, height-1])
  const start = useRef([0, 0])
  const mouseDown = useRef(false);
  const algoStarted = useRef(false);
  const isMountingRef = useRef(false);
  
  const [ grid, setGrid ] = useState(
    Array.from(Array(height), (_, y) => 
      Array.from(Array(width), (_, x) => {
          const newTile = new Tile(x, y);
          if (x == start.current[0] && y == start.current[1]) newTile.tileType = TileType.Start;
          if ( x == end.current[0] && y == end.current[1]) newTile.tileType = TileType.Finish;
          return newTile;
        }
      )
    )
  );

  useEffect(() => {
    isMountingRef.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    stepBoard();
  }, [stepCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const stepBoard = () => {
    if (!isMountingRef.current) {
      if (!algoStarted.current) {
        fringe.current.setRoot(grid[start.current[0]][start.current[1]])
        algoStarted.current = true;
      }
      setGrid(getNextBoard(algo, grid, fringe.current))
    } else {
      isMountingRef.current = false;
    }
  }


  const getClass = (node: TileNode) => {
    switch (node.tileType) {
      case TileType.Start:
        return 'bg-blue-700';
      case TileType.Finish:
        return 'bg-rose-600';
      case TileType.Path:
        return 'bg-green-500';
      case TileType.Visited:
        return 'bg-yellow-300';
      case TileType.Wall:
        return 'bg-stone-900';
      default:
        return '';
    }
  }

  const toggleWall = (x: number, y: number) => {
    const clone = structuredClone(grid);
    if (clone[x][y].tileType == TileType.None) {
      clone[x][y].tileType = TileType.Wall;
    } else if (clone[x][y].tileType == TileType.Wall) {
      clone[x][y].tileType = TileType.None;
    } 
    setGrid(clone); 
  }

  return (
    <div 
      className='p-5 flex flex-col size-full'
      onMouseDown={() => mouseDown.current = true}
      onMouseUp={() => mouseDown.current = false}
      onMouseLeave={() => mouseDown.current = false}>
        {grid.map((row, rowIndex) => {
            return <div className='flex flex-row size-full ' key={rowIndex}>
                {row.map((node, nodeIndex) => {
                    return (
                      <div
                        key={nodeIndex}
                        className={"flex size-full border border-slate-200 " + getClass(node)} 
                        onClick={() => toggleWall(rowIndex, nodeIndex)} 
                        onMouseEnter={() => (mouseDown.current) ?  toggleWall(rowIndex, nodeIndex): null}
                      />
                    )
                })}
            </div>
        })}
    </div>
  );

}

export default Board;
