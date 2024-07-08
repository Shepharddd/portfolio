"use client"
import { useEffect, useReducer, useRef, useState } from "react";
import { LeftPanel } from "./(LeftPanel)/LeftPanel";
import Fringe from "./models/Fringe";
import Tile from "./models/Tile";
import Board from "./Visual/Board/Board";

export default function AlgoVis() {

  const width = 30;
  const height = 30;
  
  const fringe = useRef<Fringe>(new Fringe());
  const [ stepCount, setStepCount ] = useState(0)
  const [ board, setBoard ] = useState<string>("Matrix");
  const [ algorithm, setAlgorithm ] = useState<string>("BFS");
  const [ animationSpeed, setAnimationSpeed ] = useState<number>(10);
  const [ animationimeout, setAnimationimeout ] = useState<NodeJS.Timeout>();

  // ANIMATE PATH FINDING
  const pathFound = useRef(false);
  const [ isAnimating, setIsAnimating ] = useState(false);


  useEffect(() => { 
    toggleAnimation()
  }, [isAnimating]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleAnimation = () => {
    if (!isAnimating) clearInterval(animationimeout);
    if (isAnimating) setAnimationimeout(setInterval(step, 50));
  }
  
  const step = () => setStepCount((val) => {
    if (stepCount > width*height) clearInterval(animationimeout);
    return val + 1;
  })

  return (
    <div className="flex flex-row h-full">
      <div className="basis-1/5">
        <LeftPanel 
          board={board} 
          setBoard={setBoard} 
          algo={algorithm} 
          setAlgo={setAlgorithm} 
          stepCount={stepCount}
          setStepCount={setStepCount}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      </div>
      <div className="basis-3/5">
        <Board 
          stepCount={stepCount} 
          width={width} 
          height={height} 
          fringe={fringe} 
          algo={algorithm} 
        />
      </div>
      <div onClick={() => setIsAnimating(!isAnimating)} className="basis-1/5" />
    </div>
  )
}
