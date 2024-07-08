import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';


function Draggable() {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'unique-id',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="circle">
        <div>
          <h2>Text1</h2>
          <h3>Text2</h3>
        </div>
        </div>
    </button>
  );
}