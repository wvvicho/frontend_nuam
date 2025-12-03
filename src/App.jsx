import Botones from "./Botones CRUD/Botones";
import Busqueda from "./Búsqueda calificaciones/Busqueda";
import Tabla from "./Tabla calificaciones/Tabla";
import { useState, useEffect } from "react";

function App() {
  //Filtros de la parte superior
  const [filtros, setFiltros] = useState({
          mercado: '',
          origen: '',
          periodo: '',
          pendiente: false
      });
  
  //Carga de datos
  const [calificaciones, setCalificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  //Paginación de la tabla
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [limite, setLimite] = useState(15);
  const [paginaActual, setPaginaActual] = useState(1);

  //Actualización calificación
  const [calificacionActualizar, setCalificacionActualizar] = useState(null);

  const manejarActualizar = (item) => {
    if (item){
      setCalificacionActualizar(item);
    }else {
      setCalificacionActualizar(null);
    }

  };

  //Data para rellenar los filtros a seleccionar en la parte superior
  const [mercados, setMercados] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  
  //URLs para transferencia de datos
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
    let datosTabla = [];
    let datos = [];
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/datos/calificaciones/?page=${paginaActual}&limit=${limite}`);
      if (!respuesta.ok) {
        console.log("No se pudieron obtener las calificaciones");
      }
      const calificaciones = await respuesta.json();
      datosTabla = calificaciones.data;
      datos = calificaciones;
      setCalificaciones(datosTabla);
      setTotalPaginas(calificaciones.totalPaginas)

      const periodosData = datosTabla.map(calificacion => calificacion.periodo);
      const periodosUnicos = [...new Set(periodosData)];
      setPeriodos(periodosUnicos);
    } catch (error) {
      console.log("Error: ", error)
    } finally {
      console.log("Datos obtenidos para la tabla: ", datosTabla);
      console.log("Datos completos: ",datos)
      setCargando(false);
    }
  };

  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas){
      setPaginaActual(nuevaPagina);
    }
  };

  //Obtener datos al cambiar de página
  useEffect(() => {
    conseguirMercados();
    conseguirOrigenes();
    conseguirCalificaciones();
  },[paginaActual]);

    
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
      <Tabla mercadoBusqueda={filtros.mercado} origenBusqueda={filtros.origen} periodoBusqueda={filtros.periodo} pendienteBusqueda={filtros.pendiente} calificaciones={calificaciones} urlCalificaciones={URL_CALIFICACIONES} cambioCalificaciones={conseguirCalificaciones} manejarActualizar={manejarActualizar} manejarCambioPagina={manejarCambioPagina} paginaActual={paginaActual} totalPaginas={totalPaginas}/>
      <Botones mercados={mercados} origenes={origenes} periodos={periodos} urlCalificaciones={URL_CALIFICACIONES} cambioCalificaciones={conseguirCalificaciones} calificacionActualizar={calificacionActualizar} manejarActualizar={manejarActualizar} refrescar={conseguirCalificaciones}/>
    </div>
  );
}

export default App;
