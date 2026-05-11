import {useDroppable} from "@dnd-kit/core";


function ZoneADeposer({ id, cardInside }) {
  const { setNodeRef, isOver } = useDroppable({ id: id.toString(), });

  const style = {
    width: '150px',
    height: '60px',
    backgroundColor: isOver ? '#bee5eb' : '#0dcaf0',
    border: '2px dashed white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  };

  return (
    <div ref={setNodeRef} style={style} className="text-white small fw-bold px-2">
      {cardInside ? cardInside : "Glisser l'opération"}
    </div>
  );
}

export default ZoneADeposer;
