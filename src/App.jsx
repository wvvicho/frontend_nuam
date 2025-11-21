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

  const [calificaciones, setCalificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [calificacionActualizar, setCalificacionActualizar] = useState(null);

  const manejarActualizar = (item) => {
    if (item){
      setCalificacionActualizar(item);
    }else {
      setCalificacionActualizar(null);
    }

  };

  const [mercados, setMercados] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  
  const URL_CALIFICACIONES = 'http://127.0.0.1:8000/datos/calificaciones/'
  const URL_MERCADO ='http://127.0.0.1:8000/datos/mercado/' 
  const URL_ORIGEN = 'http://127.0.0.1:8000/datos/origen/'

  const conseguirMercados = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(URL_MERCADO);
      if (!respuesta.ok) {
        console.log("No se pudieron obtener los mercados");
      } 
      const mercados = await respuesta.json();
      setMercados(mercados);
    } catch (error) {
      console.log("Error al conseguir mercados: ",error);
    } finally {
      setCargando(false);
    }
  };

  const conseguirOrigenes = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(URL_ORIGEN);
      if (!respuesta.ok) {
        console.log("No se pudieron obtener los origenes");
      } 
      const origenes = await respuesta.json();
      setOrigenes(origenes);
    } catch (error) {
      console.log("Error al conseguir origenes: ",error);
    } finally {
      setCargando(false);
    }
  };

  const conseguirCalificaciones = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(URL_CALIFICACIONES);
      if (!respuesta.ok) {
        console.log("No se pudieron obtener las calificaciones");
      }
      const calificaciones = await respuesta.json();
      setCalificaciones(calificaciones);

      const periodosData = calificaciones.map(calificacion => calificacion.periodo);
      const periodosUnicos = [...new Set(periodosData)];
      setPeriodos(periodosUnicos);
    
    } catch (error) {
      console.log("Error: ", error)
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    conseguirMercados();
    conseguirOrigenes();
    conseguirCalificaciones();
  },[])

  /*useEffect(() => {
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
  },[]);*/ 
    
  if (cargando) return <p>Cargando calificaciones..</p>;
  if (error) return <p>{error}</p>;    

  const Cambiando = valor => (
      setFiltros(valor)
  );

  return (
    <div className="App mt-3">
      <h1 className="text-primary">Calificaciones Tributarias</h1>
      <hr/>
      <Busqueda Cambiando={Cambiando} mercados={mercados} origenes={origenes} periodos={periodos}/>
      <Tabla mercadoBusqueda={filtros.mercado} origenBusqueda={filtros.origen} periodoBusqueda={filtros.periodo} pendienteBusqueda={filtros.pendiente} calificaciones={calificaciones} urlCalificaciones={URL_CALIFICACIONES} cambioCalificaciones={conseguirCalificaciones} manejarActualizar={manejarActualizar}/>
      <Botones mercados={mercados} origenes={origenes} periodos={periodos} urlCalificaciones={URL_CALIFICACIONES} cambioCalificaciones={conseguirCalificaciones} calificacionActualizar={calificacionActualizar} manejarActualizar={manejarActualizar}/>
    </div>
  );
}

export default App;
