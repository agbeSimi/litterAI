

function boutonSuivant({onClick, visible}) {
  if(!visible) return null
    return (
      <div className="d-flex justify-content-center"> {/* Pour centrer le bouton sous le bloc */}
        <button
          className="btn btn-primary rounded-circle shadow d-flex align-items-center justify-content-center "
          onClick={onClick}
          style={{ width: '50px', height: '50px' }} // On force la taille pour faire un cercle parfait
        >
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>→</span>
        </button>
      </div>
  );
}

export default boutonSuivant;
