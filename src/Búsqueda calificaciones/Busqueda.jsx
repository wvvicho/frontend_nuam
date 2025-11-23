import { useState } from "react";
import FiltroMercado from "./FiltroMercado";
import FiltroOrigen from "./FiltroOrigen";
import FiltroPeriodo from "./FiltroPeriodo";
import FiltroPendiente from "./FiltroPendiente";



//type="button" evita que se envíe el formulario o bien que se recargue la página
function BotonesFiltros({onBuscar, onLimpiar}) {
    return (
        <div id="Botones" className="ms-4">
            <button className="btn btn-primary col-10 mb-2" type="button" onClick={onBuscar}>Buscar</button>
            <button className="btn bg-light border border-primary col-10" type="button" onClick={onLimpiar}>Limpiar</button>
        </div>
    );
};

function Busqueda({Cambiando, mercados, origenes, periodos}) {

    const [filtros, setFiltros] = useState({
        mercado: '',
        nombreMercado: '',
        origen: '',
        periodo: '',
        pendiente: false
    });

    /*const manejarCambio = (e) => {
        const {name, value, type, checked} = e.target;
        const nuevoValor = type === 'checkbox' ? checked : value;
        
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: nuevoValor,
        }));

    };*/

    const manejarCambio = (filtro) => {
        setFiltros(prevFiltros => {
            const valorFiltro = filtro.id || filtro.value;
            const nuevosFiltros = {
                ...prevFiltros,
                [filtro.name]: valorFiltro  
            };

            if (filtro.name === 'mercado' && filtro.nombre){
                nuevosFiltros['nombreMercado'] = filtro.nombre;
            } else if (filtro.name === 'origen' && filtro.nombre){
                nuevosFiltros['nombreOrigen'] = filtro.nombre;
            }

            return nuevosFiltros;
        })
    };

    const manejarBuscar = () => {
        console.log("Filtros aplicados: ", filtros);
        Cambiando(filtros);
    };

    const manejarLimpiar = () => {
        const filtrosLimpios = {
            mercado: '',
            nombreMercado: '',
            origen: '',
            nombreOrigen: '',
            periodo: '',
            pendiente: false,
        }
        setFiltros(filtrosLimpios);
        Cambiando(filtrosLimpios);
    };

    
    return(
        <div className="container-fluid">
            <form className="row align-items-end">
                <div className="col col-lg-10 col-sm-12 col-xs-12 row align-items-end">
                    <FiltroMercado valorActual={filtros.mercado} manejarCambio={manejarCambio} mercados={mercados}/>
                    <FiltroOrigen valorActual={filtros.origen} manejarCambio={manejarCambio} origenes={origenes}/>
                    <FiltroPeriodo valorActual={filtros.periodo} manejarCambio={manejarCambio} periodos={periodos}/>
                    <FiltroPendiente valorActual={filtros.pendiente} manejarCambio={manejarCambio}/>
                </div>
                <div className="col col-lg-2 col-sm-12 col-xs-12">
                    <BotonesFiltros onBuscar={manejarBuscar} onLimpiar={manejarLimpiar}/>
                </div>
            </form>
        </div>
    );
};

export default Busqueda;