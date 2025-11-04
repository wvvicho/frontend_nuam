import { useState } from "react";
import FiltroMercado from "./FiltroMercado";
import FiltroOrigen from "./FiltroOrigen";
import FiltroPeriodo from "./FiltroPeriodo";
import FiltroPendiente from "./FiltroPendiente";



//type="button" evita que se envíe el formulario o bien que se recargue la página
function Botones({onBuscar, onLimpiar}) {
    return (
        <div id="Botones" className="ms-4">
            <button className="btn btn-primary col-10 mb-2" type="button" onClick={onBuscar}>Buscar</button>
            <button className="btn bg-light border border-primary col-10" type="button" onClick={onLimpiar}>Limpiar</button>
        </div>
    );
};

function Busqueda({Cambiando}) {

    const [filtros, setFiltros] = useState({
        mercado: '',
        origen: '',
        periodo: '',
        pendiente: false
    });

    const manejarCambio = (e) => {
        const {name, value, type, checked} = e.target;
        const nuevoValor = type === 'checkbox' ? checked : value;
        
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: nuevoValor,
        }));

        Cambiando(filtros);
    };

    const manejarBuscar = () => {
        console.log("Filtros aplicados: ", filtros);
    };

    const manejarLimpiar = () => {
        setFiltros({
            mercado: '',
            origen: '',
            periodo: '',
            pendiente: false,
        });
    };

    return(
        <div className="container-fluid">
            <form className="row align-items-end">
                <div className="col col-lg-10 col-sm-12 col-xs-12 row align-items-end">
                    <FiltroMercado valorActual={filtros.mercado} manejarCambio={manejarCambio}/>
                    <FiltroOrigen valorActual={filtros.origen} manejarCambio={manejarCambio}/>
                    <FiltroPeriodo valorActual={filtros.periodoComercial} manejarCambio={manejarCambio}/>
                    <FiltroPendiente valorActual={filtros.pendiente} manejarCambio={manejarCambio}/>
                </div>
                <div className="col col-lg-2 col-sm-12 col-xs-12">
                    <Botones onBuscar={manejarBuscar} onLimpiar={manejarLimpiar}/>
                </div>
            </form>
        </div>
    );
};

export default Busqueda;