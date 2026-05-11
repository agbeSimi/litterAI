function GenererProgramme() {
  const operations = ['additionner', 'soustraire'];
  const operationFinal = ['multiplier', 'diviser'];
  const indexAleatoire = Math.floor(Math.random() * operations.length);
  let a = Math.floor(Math.random() * 8) + 2;
  let b = Math.floor(Math.random() * 9) + 1;
  let x = Math.floor(Math.random() * 5) + 1;
  let c;

  const opSign = indexAleatoire === 0 ? "+" : "-";
  const opFinSign = indexAleatoire === 0 ? "*" : "/";

  let res1 = x * a;
  let res2 = opSign === "+" ? res1 + b : res1 - b;

  if (opFinSign === '/') {
    let diviseurs = [];
    for (let i = 2; i <= 10; i++) { if (res2 % i === 0) diviseurs.push(i); }
    c = diviseurs.length > 0 ? diviseurs[Math.floor(Math.random() * diviseurs.length)] : 1;
  } else {
    c = Math.floor(Math.random() * 9) + 1;
  }

  let res3 = opFinSign === "*" ? res2 * c : res2 / c;

  return {
    x, a, b, c,
    solutions: [res1, res2, res3],
    premierePartie: `Multiplier par ${a}`,
    deuxiemePartie: `${operations[indexAleatoire]} ${b}`,
    troisiemePartie: `${operationFinal[indexAleatoire]} par ${c}`,
    operation: opSign,
    operationFinale: opFinSign,
  };
}

export default GenererProgramme;