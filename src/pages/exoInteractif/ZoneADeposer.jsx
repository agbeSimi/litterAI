import {useDroppable} from "@dnd-kit/core";

function CardStatique({ content }) {
  return (
    <div className="card-bleue fixe">
      {content}
    </div>
  );
}

function ZoneADeposer({id, cardInside}) {
  const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div ref={setNodeRef} className={`slot-bleu ${isOver ? 'highlight' : ''}`}>
        {cardInside ? <CardStatique content={cardInside} /> : "Déposer ici"}
      </div>
    );
  }

export default ZoneADeposer;
