import { useState } from "react";

function ListaCompras({ lista, colorLista, alEliminar, alEditar, alGuardar, alCambiarComprado }) {
  const [editando, setEditando] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");

  const iniciarEdicion = (indice, nombre, cantidad) => {
    setEditando(indice);
    setNuevoNombre(nombre);
    setNuevaCantidad(cantidad);
  };

  const guardarCambios = (indice) => {
    alGuardar(indice, nuevoNombre, nuevaCantidad);
    setEditando(null);
  };

  return (
    <div className="lista-container">
      <h3 className="lista-title" style={{ color: colorLista }}>
        📋 Productos
      </h3>
      
      {lista.length === 0 ? (
        <p className="empty-message">No hay productos en la lista</p>
      ) : (
        <ul className="product-list">
          {lista.map((producto, indice) => (
            <li 
              key={indice} 
              className={`product-item ${producto.comprado ? 'comprado' : ''}`}
            >
              {editando === indice ? (
                <div className="editing-form">
                  <input
                    type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="number"
                    value={nuevaCantidad}
                    min="1"
                    onChange={(e) => setNuevaCantidad(e.target.value)}
                    className="edit-input"
                  />
                  <button 
                    onClick={() => guardarCambios(indice)} 
                    className="save-edit-button"
                  >
                    💾
                  </button>
                </div>
              ) : (
                <>
                  <span className="product-info">
                    <span className="product-name">{producto.nombre}</span>
                    <span className="product-quantity">x{producto.cantidad}</span>
                  </span>
                  <div className="product-actions">
                    <button
                      onClick={() => alCambiarComprado(indice)}
                      className={`action-button ${producto.comprado ? 'uncheck' : 'check'}`}
                    >
                      {producto.comprado ? '↩️' : '✔️'}
                    </button>
                    <button
                      onClick={() => iniciarEdicion(indice, producto.nombre, producto.cantidad)}
                      className="action-button edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => alEliminar(indice)}
                      className="action-button delete"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCompras;