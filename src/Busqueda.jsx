import { useState } from "react";

function Mercado({valorActual, manejarCambio}) {
    const ListaMercadoEj = ["Mercado1", "Mercado2", "Mercado3"];



    return (
        <div id="Mercado" className="d-flex align-items-center col-3">
            <label htmlFor="lista-mercado" className="form-label">Mercado</label>
            <select name="mercado" 
                    id="lista-mercado" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaMercadoEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );
};


function Origen({valorActual, manejarCambio}) {
    const ListaOrigenEj = ["Origen1", "Origen2", "Origen3", "Origen4", "Origen5"]

    return (
        <div id="Origen" className="d-flex align-items-center col-3 ms-4">
            <label htmlFor="lista-origen" className="form-label">Origen</label>
            <select name="origen" 
                    id="lista-origen" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaOrigenEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );
};

function PeriodoComercial({valorActual, manejarCambio}) {
    const ListaPeriodoComercialEj = ["PeriodoComercial1", "PeriodoComercial2", "PeriodoComercial3", "PeriodoComercial4", "PeriodoComercial5"]

    return (
        <div id="PeriodoComercial" className="d-flex align-items-center col-5 ms-4 text-nowrap">
            <label htmlFor="lista-periodo" className="form-label">Periodo Comercial</label>
            <select name="periodo" 
                    id="lista-periodo" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaPeriodoComercialEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );

};

function Pendiente({valorActual, manejarCambio}) {
    return (
        <div id="Pendiente">
            <label htmlFor="pendiente">Calificación Pendiente</label>
            <input type="checkbox" 
                    name="pendiente" 
                    id="pendiente" 
                    checked={valorActual}
                    onChange={manejarCambio}
                    className="ms-2"/>
        </div>
    )
}


//type="button" evita que se envíe el formulario o bien que se recargue la página
function Botones({onBuscar, onLimpiar}) {
    return (
        <div id="Botones" className="ms-4">
            <button className="btn btn-primary col-10 mb-2" type="button" onClick={onBuscar}>Buscar</button>
            <button className="btn bg-light border border-primary col-10" type="button" onClick={onLimpiar}>Limpiar</button>
        </div>
    );
};

function Busqueda() {

    const [filtros, setFiltros] = useState({
        mercado: 'Mercado1',
        origen: 'Origen1',
        periodo: 'PeriodoComercial1',
        pendiente: false
    });

    const manejarCambio = (e) => {
        const {name, value, type, checked} = e.target;
        const nuevoValor = type === 'checkbox' ? checked : value;
        
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: nuevoValor,
        }));
    };

    const manejarBuscar = () => {
        console.log("Filtros aplicados: ", filtros);
    };

    const manejarLimpiar = () => {
        setFiltros({
            mercado: 'Mercado1',
            origen: 'Origen1',
            periodo: 'PeriodoComercial1',
            pendiente: false,
        });
    };

    return(
        <div className="container-fluid">
            <form className="row align-items-end">
                <div className="col-10 row align-items-end">
                    <Mercado valorActual={filtros.mercado} manejarCambio={manejarCambio}/>
                    <Origen valorActual={filtros.origen} manejarCambio={manejarCambio}/>
                    <PeriodoComercial valorActual={filtros.periodoComercial} manejarCambio={manejarCambio}/>
                    <Pendiente valorActual={filtros.pendiente} manejarCambio={manejarCambio}/>
                </div>
                <div className="col-2">
                    <Botones onBuscar={manejarBuscar} onLimpiar={manejarLimpiar}/>
                </div>
            </form>
        </div>
    );
};

export default Busqueda;