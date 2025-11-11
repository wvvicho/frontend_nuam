import Botones from "./Botones CRUD/Botones";
import Busqueda from "./Búsqueda calificaciones/Busqueda";
import Tabla from "./Tabla calificaciones/Tabla";
import { useState, useEffect } from "react";

function App() {

  const [filtros, setFiltros] = useState({
          mercado: '',
          origen: '',
          periodo: '',
          pendiente: false
      });

  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [mercados, setMercados] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  
  const URL_API = 'http://localhost:3000/calificaciones'

  useEffect(() => {
        fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setCargando(false);


            const mercadosData = data.map(calificacion => calificacion.mercado);
            const origenesData = data.map(calificacion => calificacion.origen);
            const periodosData = data.map(calificacion => calificacion.periodo);

            const mercadosUnicos = [...new Set(mercadosData)];
            const origenesUnicos = [...new Set(origenesData)];
            const periodosUnicos = [...new Set(periodosData)];

            setMercados(mercadosUnicos);
            setOrigenes(origenesUnicos);
            setPeriodos(periodosUnicos);
        })
        .catch(error => {
            setError(error);
            setCargando(false);
        })
  },[]); 
    
  if (cargando) return <p>Cargando calificaciones..</p>;
  if (error) return <p>{error}</p>;    

  const Cambiando = valor => (
      setFiltros(valor)
  );

  return (
    <div className="App">
      <h1 className="text-primary">Calificaciones Tributarias</h1>
      <hr/>
      <Busqueda Cambiando={Cambiando} mercados={mercados} origenes={origenes} periodos={periodos}/>
      <Tabla mercadoBusqueda={filtros.mercado} origenBusqueda={filtros.origen} periodoBusqueda={filtros.periodo} pendienteBusqueda={filtros.pendiente} calificaciones={data}/>
      <Botones />
    </div>
  );
}

export default App;
