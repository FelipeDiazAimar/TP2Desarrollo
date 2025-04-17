import { useState } from "react";
import ListaCompras from "./componentes/ListaCompras";
import FormularioEntrada from "./componentes/FormularioEntrada";
import './App.css';

function App() {
  const [listas, setListas] = useState([
    { nombre: "Mi Lista", color: "#a5d8ff", productos: [] }
  ]);
  const [indiceListaActiva, setIndiceListaActiva] = useState(0);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoColor, setNuevoColor] = useState("#a5d8ff");
  const [creandoLista, setCreandoLista] = useState(false);
  const [mostrarOpcionesEditar, setMostrarOpcionesEditar] = useState(false);

  const agregarProducto = (nombre, cantidad) => {
    if (nombre.trim() === "" || cantidad <= 0) return;

    const nuevasListas = [...listas];
    nuevasListas[indiceListaActiva].productos.push({
      nombre,
      cantidad,
      editando: false,
      comprado: false
    });

    setListas(nuevasListas);
  };

  const eliminarProducto = (indiceProducto) => {
    const nuevasListas = [...listas];
    nuevasListas[indiceListaActiva].productos.splice(indiceProducto, 1);
    setListas(nuevasListas);
  };

  const cambiarEditar = (indiceProducto) => {
    const nuevasListas = [...listas];
    const producto = nuevasListas[indiceListaActiva].productos[indiceProducto];
    producto.editando = !producto.editando;
    setListas(nuevasListas);
  };

  const guardarEdicion = (indiceProducto, nuevoNombre, nuevaCantidad) => {
    if (nuevoNombre.trim() === "" || nuevaCantidad <= 0) return;

    const nuevasListas = [...listas];
    const producto = nuevasListas[indiceListaActiva].productos[indiceProducto];
    producto.nombre = nuevoNombre;
    producto.cantidad = nuevaCantidad;
    producto.editando = false;

    setListas(nuevasListas);
  };

  const cambiarComprado = (indiceProducto) => {
    const nuevasListas = [...listas];
    const productos = nuevasListas[indiceListaActiva].productos;
    const producto = productos[indiceProducto];
    producto.comprado = !producto.comprado;

    productos.splice(indiceProducto, 1);
    if (producto.comprado) {
      productos.push(producto);
    } else {
      const noComprados = productos.filter(p => !p.comprado);
      const comprados = productos.filter(p => p.comprado);
      productos.length = 0;
      productos.push(...noComprados, ...comprados, producto);
    }

    setListas(nuevasListas);
  };

  const alEditarNombreYColor = (nuevoNombre, nuevoColor) => {
    const nuevasListas = [...listas];
    const listaActual = nuevasListas[indiceListaActiva];
    listaActual.nombre = nuevoNombre;
    listaActual.color = nuevoColor;
    setListas(nuevasListas);
  };

  const agregarNuevaLista = () => {
    if (!nuevoNombre || !nuevoColor) return;

    setListas([...listas, { nombre: nuevoNombre, color: nuevoColor, productos: [] }]);
    setIndiceListaActiva(listas.length);
    setNuevoNombre("");
    setNuevoColor("#a5d8ff");
    setCreandoLista(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🛒 Mi Lista de Compras</h1>
        <p className="subtitle">Organiza tus compras con estilo</p>
      </header>

      <div className="listas-container">
        <div className="listas-buttons">
          {listas.map((lista, i) => (
            <button
              key={i}
              onClick={() => setIndiceListaActiva(i)}
              className={`lista-button ${i === indiceListaActiva ? 'active' : ''}`}
              style={{ borderColor: lista.color }}
            >
              {lista.nombre}
            </button>
          ))}

          <button
            onClick={() => setCreandoLista(true)}
            className="lista-button new"
          >
            ➕ Nueva Lista
          </button>

          <button
            onClick={() => setMostrarOpcionesEditar(!mostrarOpcionesEditar)}
            className="lista-button edit"
          >
            ✏️ Editar
          </button>
        </div>

        {creandoLista && (
          <div className="nueva-lista-form">
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Nombre de la lista"
              className="input-text"
            />
            <input
              type="color"
              value={nuevoColor}
              onChange={(e) => setNuevoColor(e.target.value)}
              className="input-color"
            />
            <div className="form-actions">
              <button onClick={agregarNuevaLista} className="confirm-button">
                ✅ Confirmar
              </button>
              <button 
                onClick={() => setCreandoLista(false)} 
                className="cancel-button"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        )}

        {mostrarOpcionesEditar && (
          <div className="editar-lista-form">
            <h4>Editar Lista Actual</h4>
            <input
              type="text"
              placeholder="Nuevo nombre"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="input-text"
            />
            <input
              type="color"
              value={nuevoColor}
              onChange={(e) => setNuevoColor(e.target.value)}
              className="input-color"
            />
            <div className="form-actions">
              <button
                onClick={() => {
                  alEditarNombreYColor(nuevoNombre, nuevoColor);
                  setMostrarOpcionesEditar(false);
                }}
                className="save-button"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => {
                  const nuevasListas = [...listas];
                  nuevasListas.splice(indiceListaActiva, 1);
                  setListas(nuevasListas);
                  setIndiceListaActiva(0);
                  setMostrarOpcionesEditar(false);
                }}
                className="delete-button"
              >
                🗑️ Eliminar
              </button>
              <button 
                onClick={() => setMostrarOpcionesEditar(false)} 
                className="cancel-button"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <FormularioEntrada alAgregar={agregarProducto} />

      <ListaCompras
        lista={listas[indiceListaActiva].productos}
        colorLista={listas[indiceListaActiva].color}
        alEliminar={eliminarProducto}
        alEditar={cambiarEditar}
        alGuardar={guardarEdicion}
        alCambiarComprado={cambiarComprado}
      />
    </div>
  );
}

export default App;