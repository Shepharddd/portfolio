"use client"
import { useState } from "react";
import { LeftPanel, Player } from "./(LeftPanel)/LeftPanel"
import Display from "./(Display)/Display";

export default function kellypool() {

  const arrayGen = (len: number, fill: any) => Array.from({length: len}, () => fill)

  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ balls, setBalls ] = useState<boolean[]>(arrayGen(15, true));
  const [ reveal, setReveal ] = useState<Player | null>(null)
  const [ players, setPlayers ] = useState<Player[]>([])
  const [ assignment, setAssignment ] = useState<number[]>(arrayGen(15, -1));
  const [ ballsPerPerson, setBallsPerPerson ] = useState(2);


  const randomIdx = (max: number) => Math.floor(Math.random() * max);
  const isAssigned = assignment.some((val) => (val >= 0));
  const checkWin = () => (players.filter((player) => player.balls.length > 0).length == 1);

  const assign = () => {
    const balls = Array.from({length: 15}, (v, i) => i)
    var assig = structuredClone(assignment);
    players.map((player) => player.balls = Array.from({length: ballsPerPerson}).map((_) => balls.splice(randomIdx(balls.length), 1)[0]))
    players.map((player) => player.balls.map((i) => assig[i] = player.id));
    setAssignment(assig)
  }

  const startStop = () => {
    if (isPlaying) {
      setAssignment(Array.from({length: 15}, (v, i) => -1));
      players.map((player) => player.balls = []);
      setBalls(arrayGen(15, true));
      setIsPlaying(false);
    } else {
      if (players.length < 2) return;
      assign();
      setIsPlaying(true);
    }
  }

  const sinkBall = (id: number) => {
    if (assignment[id] < 0 ) return;
    var tmp = structuredClone(players);
    tmp[assignment[id]].balls = tmp[assignment[id]].balls.filter((item) => item != id)
    setPlayers(tmp);
  }

  const retrieveBall = (id: number) => {
    var tmp = structuredClone(players);
    tmp[assignment[id]].balls.push(id);
    setPlayers(tmp);
  }

  const onTapBall = (id: number) => {
    if (!isAssigned) return;
    balls[id] ? sinkBall(id) : retrieveBall(id);
    const clone = structuredClone(balls);
    clone[id] = !clone[id];
    setBalls(clone);
  }

  const showBalls = (player: Player) => {
    if (reveal === player) setReveal(null);
    else setReveal(player);
  }


  return (
    <div className="flex flex-row h-full">
      <div className="basis-1/5" >
        <LeftPanel 
          players={players} 
          setPlayers={setPlayers}
          startStop={startStop}
          showBalls={showBalls}
          reveal={reveal}
          ballsPerPerson={ballsPerPerson}
          setBallsPerPerson={setBallsPerPerson}
          isPlaying={isPlaying}
        />
      </div>
      <div className="basis-3/5">
        <Display 
          onClick={onTapBall} 
          show={balls}
          reveal={reveal}
        />
      </div>
      <div className="basis-1/5" />
    </div>
  );
}