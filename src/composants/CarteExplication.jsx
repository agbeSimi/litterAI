import { motion } from "framer-motion";
import React from "react";

function CarteConcept({description}) {
  return (
    <motion.div
      // Animation d'entrée (Fade in + montée)
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}

      // Animation au survol (Effet de lévitation)
      whileHover={{
        y: -10,
        shadow: "0px 10px 20px rgba(0,0,0,0.1)",
        scale: 1.02
      }}

      className="card card-litteral shadow-sm rounded-4 p-4 m-4"
      style={{ cursor: 'pointer' }}
    >
      <h5 className="fw-bold text-primary">🛠️ Comment résoudre? : </h5>
      <p>
        {description}
      </p>

    </motion.div>
  );
}

export default CarteConcept;