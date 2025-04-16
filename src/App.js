import { useState } from "react";
import ListaCompras from "./componentes/ListaCompras";
import FormularioEntrada from "./componentes/FormularioEntrada";
import './App.css';

// Componente principal de la aplicación
function App() {
  const [listas, setListas] = useState([
    { nombre: "Lista 1", color: "#ffcccc", productos: [] }
  ]);
  
  const [indiceListaActiva, setIndiceListaActiva] = useState(0);
  const [nuevoNombre, setNuevoNombre] = useState("");  // Estado para el nombre de la lista
  const [nuevoColor, setNuevoColor] = useState("");  // Estado para el color de la lista
  const [creandoLista, setCreandoLista] = useState(false);  // Estado para controlar si se está creando una nueva lista

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

  const alEditarNombreYColor = (nuevoNombre, nuevoColor) => {
      const nuevasListas = [...listas];
      const listaActual = nuevasListas[indiceListaActiva];
    
      // Actualizamos el nombre y el color de la lista activa
      listaActual.nombre = nuevoNombre;
      listaActual.color = nuevoColor;
    
      setListas(nuevasListas);
    };
    
    // Sacar el producto de la lista
    productos.splice(indiceProducto, 1);

    // Reubicarlo según su estado
    if (producto.comprado) {
      productos.push(producto); // al final si está comprado
    } else {
      const noComprados = productos.filter(p => !p.comprado);
      const comprados = productos.filter(p => p.comprado);
      productos.length = 0;
      productos.push(...noComprados, ...comprados, producto);
    }

    setListas(nuevasListas);
  };

  const agregarNuevaLista = () => {
    if (!nuevoNombre || !nuevoColor) return;  // Validar que los campos no estén vacíos

    setListas([...listas, { nombre: nuevoNombre, color: nuevoColor, productos: [] }]);
    setIndiceListaActiva(listas.length); // seleccionar la nueva
    setNuevoNombre("");  // Limpiar los campos de entrada
    setNuevoColor("");  // Limpiar los campos de entrada
    setCreandoLista(false);  // Cerrar el formulario de creación
  };

  const activarFormulario = () => {
    setCreandoLista(true);  // Activar el formulario de creación de lista
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🛒 Mi Lista de Compras</h1>

      {/* 📦 Mostrar y seleccionar listas */}
      <div>
        {listas.map((lista, i) => (
          <button
            key={i}
            onClick={() => setIndiceListaActiva(i)}
            style={{
              backgroundColor: i === indiceListaActiva ? "#cce5ff" : "#cce5ff",
              border: `2px solid ${lista.color}`,
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "150px",  // Establecer el mismo ancho
              height: "40px",  // Establecer la misma altura
            }}
          >
            {lista.nombre}
          </button>
        ))}

        <button
          onClick={activarFormulario}
          style={{
            marginLeft: "10px",
            backgroundColor: "#cce5ff",
            border: "2px solid #3399ff",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "150px",  // Establecer el mismo ancho
            height: "40px",  // Establecer la misma altura
          }}
        >
          ➕ Nueva Lista
        </button>
      </div>

      {/* 🧾 Formulario para agregar nombre y color a la lista, con animación */}
      {creandoLista && (
        <div style={{ marginTop: "20px", transition: "max-height 0.5s ease-out", maxHeight: "200px" }}>
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Nombre de la nueva lista"
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "10px",
              width: "150px"
            }}
          />
          <input
            type="color"
            value={nuevoColor}
            onChange={(e) => setNuevoColor(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "10px"
            }}
          />
          <button
            onClick={agregarNuevaLista}  // Usar la función agregarNuevaLista
            style={{
              backgroundColor: "#cce5ff",
              border: "2px solid #3399ff",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            ✅ Confirmar
          </button>
        </div>
      )}

      {/* 🧾 Formulario para agregar productos */}
      <FormularioEntrada alAgregar={agregarProducto} />

      {/* 📋 Lista de productos de la lista activa */}
      <ListaCompras
        lista={listas[indiceListaActiva].productos}
        alEliminar={eliminarProducto}
        alEditar={cambiarEditar}
        alGuardar={guardarEdicion}
        alCambiarComprado={cambiarComprado}
      />
    </div>
  );
}

export default App;