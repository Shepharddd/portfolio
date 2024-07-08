"use client"
import { Dispatch, FormEventHandler, MouseEventHandler, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import { buttonStyle } from './style';


export class Player {

  id: number;
  name: String;
  balls: number[] = [];

  constructor(id: number, name?: String) {
    this.id = id;
    this.name = name ?? "player " + id
  }
}

interface PanelProps {
  players: Player[];
  reveal: Player | null;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  startStop: () => void;
  showBalls: (player: Player) => void;
  ballsPerPerson: number;
  setBallsPerPerson: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
}

export const LeftPanel: React.FC<PanelProps> = ({
  players, 
  setPlayers,
  startStop,
  showBalls,
  reveal,
  ballsPerPerson,
  setBallsPerPerson,
  isPlaying,
}) => {

  const addPlayer = (name: String) => {
    if (name == "") return;
    if (players.length >= 15) return;
    setPlayers([...players, new Player(players.length, name)]);
  }

  const editBallCount = (increment: boolean) => {
    if (increment) {
      if ((ballsPerPerson+1) * players.length > 15) return;
      setBallsPerPerson(ballsPerPerson+1);
    } else {
      if (ballsPerPerson < 2) return;
      setBallsPerPerson(ballsPerPerson -1);
    }
  }

  return (
    <div className='p-3 flex flex-col justify-center'>
      

      {players.map((player, index) => <PlayerTile key={index} reveal={reveal} player={player} showBalls={showBalls} />)}
    

      <AddPlayer onClick={addPlayer} />

      <div 
        className="mt-7 flex flex-row w-full justify-between">
          <div
            onClick={() => editBallCount(false)}
            className={buttonStyle + ' rounded-full w-1/4'}>
              <p className='text-center'>-</p>
          </div>
          <div className={buttonStyle + ' rounded-full w-1/4'}>
            <p className='text-center'>{ballsPerPerson}</p>
          </div>
          <div
            onClick={() => editBallCount(true)}
            className={buttonStyle + ' rounded-full w-1/4'}>
              <p className='text-center'>+</p>
          </div>
      </div>

      <div 
        onClick={() => startStop()}
        className={buttonStyle + " text-center rounded-full"}>
          {(isPlaying) ? "Stop" : "Start" }
      </div>
      
    </div>
  );
}

interface AddPlayerProps {
  onClick: (name: String) => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({
  onClick
}) => {
  const [ name, setName ] = useState("");

  const handleClick = () => {
    onClick(name)
    setName("")
  }

  return (
    <button className={buttonStyle}>
        <div className='w-full flex flex-row justify-between'>
            {/* <div className="w-4/5 "> */}
              <input 
                type="text" 
                className=' bg-transparent text-xs font-medium uppercase leading-normal text-neutral-600 focus:outline-none focus:ring-0' 
                onChange={e => setName(e.target.value)} 
                value={name}
                placeholder="Name..." />
            {/* </div> */}
            <button className='basis-1/5 size-min rounded-full hover:bg-neutral-300 active:bg-neutral-400' onClick={handleClick}>+</button>
        </div>
      </button>
  );
}


interface PlayerTileProps {
  player: Player;
  reveal: Player | null;
  showBalls: (player: Player) => void;
}

const PlayerTile: React.FC<PlayerTileProps> = ({
  player,
  showBalls,
  reveal,
}) => {
  
  return (
    <div
      onClick={() => showBalls(player)}
      className={buttonStyle + ((reveal === player) ? " bg-neutral-200": "")}>
        <div className='w-full flex-row flex justify-between'>

          <div className='basis-5/6'>
            <p>{player.name}</p>
          </div>

          <div className='basis-1/6'>
            <p className='text-center'>{player.balls.length}</p>
          </div>
            
        </div>
    </div>
  );
}