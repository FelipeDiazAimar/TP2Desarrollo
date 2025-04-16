import { useState } from "react";

// Componente que permite escribir un nuevo ítem y agregarlo
function FormularioEntrada({ alAgregar, alEditarNombreYColor }) {
  const [entrada, setEntrada] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    const cantidadNumero = parseInt(cantidad);

    if (entrada.trim() === "") return;
    if (isNaN(cantidadNumero) || cantidadNumero <= 0) return;

    alAgregar(entrada, cantidadNumero);
    setEntrada("");
    setCantidad("");
  };

  const manejarEditar = () => {
    if (nuevoNombre.trim() === "" || !nuevoColor) return;
    alEditarNombreYColor(nuevoNombre, nuevoColor);
    setNuevoNombre("");
    setNuevoColor("");
  };

  return (
    <div>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button type="submit">➕ Agregar</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nuevo nombre de la lista"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <input
          type="color"
          value={nuevoColor}
          onChange={(e) => setNuevoColor(e.target.value)}
        />
        <button onClick={manejarEditar}>
          🖋️ Editar Nombre y Color
        </button>
      </div>
    </div>
  );
}

export default FormularioEntrada;
