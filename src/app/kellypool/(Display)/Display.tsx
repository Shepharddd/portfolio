import { Player } from "../(LeftPanel)/LeftPanel";

const ball = (id: number, onClick: (id: number) => void, show: boolean) => {
  const colors = ["bg-yellow-300", "bg-blue-600", "bg-red-600", "bg-violet-900","bg-orange-500", "bg-green-600", "bg-red-950", "bg-black"];
  return (
    <div className={"aspect-square p-1 " + ((show) ? " " : "opacity-25")} onClick={() => onClick(id)}>
      <div className={"flex flex-col size-full rounded-full justify-center border border-slate-200 overflow-hidden " + colors[((id) % 8)]} >
        {(id > 8) ? <div className="basis-1/4 bg-neutral-100 justify-center " /> : null}
        <div className="flex flex-row aspect-square basis-1/2 rounded-full justify-center" >
          <div className="flex flex-col basis-1/2 rounded-full bg-neutral-100 justify-center">
            <p className="text-center">{id+1}</p>
          </div>
        </div>
        {(id > 8) ? <div className="basis-1/4 bg-neutral-100 justify-center " /> : null}
      </div>
    </div>
  );
}

const ballRow = (balls: JSX.Element[]) => {
  return (
    <div className="basis-1/5 flex flex-row w-full justify-center">
      {balls}
    </div>
  );
}

interface DisplayProps {
  onClick: (id: number) => void;
  show: boolean[];
  reveal: Player | null,
}

const Display: React.FC<DisplayProps> = ({ 
  onClick,
  show,
  reveal,
}) => {
  show = (reveal !== null) ? Array.from({length: 15}, (v, i) => reveal.balls.includes(i) && show[i]) : show;
  const balls = show.map((value, index) => ball(index, onClick, value))
  return (
    <div className="flex flex-col size-full">
      <div className='basis-1/2 p-5 flex flex-col size-full'>
        {Array.from({length: 5}, (v, i) => ballRow(balls.splice(0, i+1)))}
      </div>
    </div>
  );
}

export default Display;