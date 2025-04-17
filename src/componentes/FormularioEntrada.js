import { useState } from "react";

function FormularioEntrada({ alAgregar }) {
  const [entrada, setEntrada] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (entrada.trim() === "") return;
    alAgregar(entrada, parseInt(cantidad) || 1);
    setEntrada("");
    setCantidad(1);
  };

  return (
    <form onSubmit={manejarSubmit} className="product-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="🍎 Nombre del producto"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="🔢 Cantidad"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">
        ✨ Agregar Producto
      </button>
    </form>
  );
}

export default FormularioEntrada;