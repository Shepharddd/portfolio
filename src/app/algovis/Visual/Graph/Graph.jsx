import { useDroppable } from '@dnd-kit/core';


export function Graph() {

  const {setNodeRef} = useDroppable({
    id: 'unique-id',
  });
  
  return (
    <>
      <div ref={setNodeRef}>
        <div className='graph-containr' />
      </div>
        <div className="right-panel-container">
          <div id={`${canPlaceStart ? 'selected' : ''}`}
              className='right-panel-button'      
              onClick={() => setCanPlaceStart(!canPlaceStart)}>
                  <p>start cell</p>
          </div>
          <div id={`${canPlaceEnd ? 'selected' : ''}`} 
              className='right-panel-button'      
              onClick={() => setCanPlaceEnd(!canPlaceEnd)}>
                  <p>End Cell</p>
          </div>
          <div id='button-cell' 
              className='right-panel-button'   
              onClick={() => step()}>
                  <p>{"Step " + algo}</p>
          </div>
          <div id='button-cell' 
              className='right-panel-button'   
              onClick={() => setIsAnimating(!isAnimating)}>
                  <p>{isAnimating ? "Stop" : "Begin " + "Animation"}</p>
          </div>
          <div id={`${canPlaceWall ? 'selected' : ''}`}
              className='right-panel-button'
              onClick={() => setCanPlaceWall(!canPlaceWall)}>
                  <p>Add Walls</p>
          </div>
          <div id='button-cell' 
              className='right-panel-button' 
              onClick={() => newGrid()}>
                  <p>Reset Board</p>
          </div>
      </div>
    </>
  );
}