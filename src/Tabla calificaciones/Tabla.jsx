import { useState } from "react";
import '../Estilos/tabla.css';

function Tabla({ mercadoBusqueda, origenBusqueda, periodoBusqueda, pendienteBusqueda, calificaciones, urlCalificaciones, cambioCalificaciones, manejarActualizar, paginaActual, totalPaginas, manejarCambioPagina}) {


    const [filtrosPrincipales, setFiltrosPrincipales] = useState(
        {
            ejercicio: '',
            instrumento: '',
            fecha_pago: '',
            descripcion: '',
            secuencia_evento: '',
            factor_actualizacion: '',
        }
    );
    const factores = Array(31).fill('');
    const [factoresFiltros, setFactoresFiltros] = useState(factores);

    const { ejercicio, instrumento, fecha_pago, descripcion, secuencia_evento, factor_actualizacion} = filtrosPrincipales;

    const manejarFiltroPrincipal = (e) => {
        const {id, value} = e.target;
        setFiltrosPrincipales(prev => (
            {
                ...prev,
                [id]: value
            }
        ));
    };

    const manejarFiltroFactores = (index, value) => {
        setFactoresFiltros(prevFactores => 
            {
                const nuevosFactores = [...prevFactores];
                nuevosFactores[index] = value;
                return nuevosFactores;
            }
        );
    };

    const valorMercado = mercadoBusqueda || '';
    const valorOrigen = origenBusqueda || '';

    const CalificacionesFiltrada = calificaciones.filter(calificacion => {
        
        const filtrosPrincipalesOk = (
            String(calificacion.mercado).includes(valorMercado.toLowerCase()) &&
            String(calificacion.origen).includes(valorOrigen.toLowerCase()) &&
            String(calificacion.periodo).includes(String(periodoBusqueda).toLowerCase()) &&
            String(calificacion.ejercicio).includes(ejercicio.toLowerCase()) &&
            calificacion.instrumento.toLowerCase().includes(instrumento.toLowerCase()) &&
            calificacion.fecha_pago.toLowerCase().includes(fecha_pago.toLowerCase()) &&
            String(calificacion.descripcion).toLowerCase().includes(descripcion.toLowerCase()) &&
            String(calificacion.secuencia_evento).includes(secuencia_evento.toLowerCase()) &&
            String(calificacion.factor_actualizacion).includes(factor_actualizacion.toLowerCase()) 
        );

        
        
        const factoresOk = factoresFiltros.every((factorValor, index) => {
            return String(calificacion.factores[index]).includes(factorValor.toLowerCase());
        });

        return filtrosPrincipalesOk && factoresOk;
    });

    const eliminarCalificacion = async (id) => {
        if (!id) {
            console.log("No se proporcionó ID");
            return ;
        }
        try {
            const API = `${urlCalificaciones}${id}/`;
            const respuesta = await fetch(API, {
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (respuesta.ok) {
                console.log("Calificación eliminada con éxito")
                cambioCalificaciones();
            } else {
                const Error = respuesta.statusText;
                console.log(Error);
            }
        } catch (error) {
            console.log("Error: ",error);
        }
    };

    const actualizarCalificacion = (item) => {
        if (!item) {
            console.log("No se proporcionó una calificación")
            return;
        }
        manejarActualizar(item);
    };

    return (
        <div>
            <div className="mt-3 table-responsive mb-4">
                <table className="table table-bordered table-fixed-header">
                    <thead>
                        <tr className="table-row text-nowrap">
                            <th scope="col">Acciones</th>
                            <th scope="col">Ejercicio</th>
                            <th scope="col">Instrumento</th>
                            <th scope="col">Fecha Pago</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Secuencia Evento</th>
                            <th scope="col">Factor de Actualización</th>

                            {factoresFiltros.map((_, index) => (
                                <th scope="col" key={index}>Factor-{String(index + 8).padStart(2, '0')}</th>
                            ))}
                        </tr>
                        <tr className="filtros">
                            <td>
                                <h6>Filtros</h6>
                            </td>
                            <td>
                                <input type="number" 
                                        id="ejercicio" 
                                        value={ejercicio}
                                        onChange={manejarFiltroPrincipal}
                                        />
                            </td>
                            <td>
                                <input type="text" 
                                        id="instrumento" 
                                        value={instrumento}
                                        onChange={manejarFiltroPrincipal}
                                        />
                            </td>
                            <td>
                                <input type="text" 
                                        id="fecha_pago" 
                                        value={fecha_pago}
                                        onChange={manejarFiltroPrincipal}
                                        />
                            </td>
                            <td>
                                <input type="text" 
                                        id="descripcion" 
                                        value={descripcion}
                                        onChange={manejarFiltroPrincipal}
                                        />
                            </td>
                            <td>
                                <input type="number" 
                                        id="secuencia_evento" 
                                        value={secuencia_evento}
                                        onChange={manejarFiltroPrincipal}
                                        />
                            </td>
                            <td>
                                <input type="number" 
                                        id="factor_actualizacion" 
                                        value={factor_actualizacion}
                                        onChange={manejarFiltroPrincipal}
                                        />      
                            </td>

                            {factoresFiltros.map((factor, index) => (
                                <td key={index}>
                                    <input 
                                        type="number" 
                                        value={factor} 
                                        onChange={manejarFiltroFactores} 
                                        />
                                </td>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {CalificacionesFiltrada.map((item, index) => (
                            <tr key={index}>
                                <td className="d-flex gap-3">
                                    <button className="btn btn-warning w-50" onClick={() => actualizarCalificacion(item)}>Actualizar</button> 
                                    <button className="btn btn-danger w-50" onClick={() => eliminarCalificacion(item.id)}>Eliminar</button>
                                </td>
                                <td>{item.ejercicio}</td>
                                <td>{item.instrumento}</td>
                                <td>{item.fecha_pago}</td>
                                <td className="text-nowrap">{item.descripcion}</td>
                                <td>{item.secuencia_evento}</td>
                                <td>{item.factor_actualizacion}</td>

                                {item.factores.map((factor_valor, factor_index) => (
                                    <td key={factor_index}>{factor_valor}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
                    <button onClick={() => manejarCambioPagina(paginaActual - 1)} disabled={paginaActual === 1} className="btn btn-secondary">Anterior</button>
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    <button onClick={() => manejarCambioPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="btn btn-secondary">Siguiente</button>
            </div>
        </div>
    );
};

export default Tabla;