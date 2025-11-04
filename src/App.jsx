import Busqueda from "./Búsqueda calificaciones/Busqueda";
import Tabla from "./Tabla calificaciones/Tabla";
import { useState } from "react";

function App() {

  const [filtros, setFiltros] = useState({
          mercado: '',
          origen: '',
          periodo: '',
          pendiente: false
      });

  const Cambiando = valor => (
      setFiltros(valor)
  );

  return (
    <div className="App">
      <h1 className="text-primary">Calificaciones Tributarias</h1>
      <hr/>
      <Busqueda Cambiando={Cambiando}/>
      <Tabla mercadoBusqueda={filtros.mercado} origenBusqueda={filtros.origen} periodoBusqueda={filtros.periodo} pendienteBusqueda={filtros.pendiente} />
    </div>
  );
}

export default App;
