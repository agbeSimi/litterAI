import {useDraggable} from "@dnd-kit/core";

function CarteADeposer({id, content}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="btn btn-info shadow-sm text-white fw-bold">
      {content}
    </div>
  )
}

export default CarteADeposer;