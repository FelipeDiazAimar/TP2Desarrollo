import { useState } from "react";

function ListaCompras({
  lista,
  nombreLista,
  colorLista,
  alEditarNombreYColor,
  alBorrarLista,
  alEliminar,
  alEditar,
  alGuardar,
  alCambiarComprado,
  seleccionandoEdicion,
  setSeleccionandoEdicion,
  setListaSeleccionada
}) {
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [editandoLista, setEditandoLista] = useState(false);
  const [nuevoNombreLista, setNuevoNombreLista] = useState(nombreLista);
  const [nuevoColorLista, setNuevoColorLista] = useState(colorLista);

  return (
    <div className="lista-compras">
      {/* Encabezado de la lista */}
      <div className="encabezado-lista" style={{ backgroundColor: colorLista }}>
        {editandoLista ? (
          <div className="form-editar-lista">
            <input
              type="text"
              value={nuevoNombreLista}
              onChange={(e) => setNuevoNombreLista(e.target.value)}
              placeholder="Nombre de la lista"
            />
            <input
              type="color"
              value={nuevoColorLista}
              onChange={(e) => setNuevoColorLista(e.target.value)}
            />
            <button
              onClick={() => {
                alEditarNombreYColor(nuevoNombreLista, nuevoColorLista);
                setEditandoLista(false);
              }}
            >
              💾 Guardar
            </button>
            <button onClick={() => setEditandoLista(false)}>
              ❌ Cancelar
            </button>
          </div>
        ) : (
          <div className="titulo-y-opciones">
            <h2>{nombreLista}</h2>
            <div className="botones-lista">
              <button onClick={() => setEditandoLista(true)}>✏️ Editar lista</button>
              <button onClick={alBorrarLista} className="btn-borrar">🗑️ Borrar lista</button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de ítems */}
      <ul className="lista-productos">
        {lista.map((item, indice) => (
          <li key={indice} className={item.comprado ? "comprado" : ""}>
            {item.editando ? (
              <>
                <input
                  type="text"
                  value={nuevoTexto}
                  onChange={(e) => setNuevoTexto(e.target.value)}
                />
                <button onClick={() => alGuardar(indice, nuevoTexto)}>💾 Guardar</button>
              </>
            ) : (
              <>
                <span>{item.nombre} ({item.cantidad})</span>
                <div className="acciones-item">
                  <button onClick={() => alCambiarComprado(indice)}>
                    {item.comprado ? "↩️ Desmarcar" : "✅ Comprado"}
                  </button>
                  <button
                    onClick={() => {
                      setNuevoTexto(item.nombre);
                      alEditar(indice);
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button onClick={() => alEliminar(indice)}>❌ Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;
