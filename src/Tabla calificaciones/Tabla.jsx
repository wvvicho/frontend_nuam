import { useState } from "react";

function Tabla({ mercadoBusqueda, origenBusqueda, periodoBusqueda, pendienteBusqueda, calificaciones }) {

    const [ejercicio, setEjercicio] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [fecha_pago, setFechaPago] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [secuencia_evento, setSecuenciaEvento] = useState('');
    const [factor_actualizacion, setFactorActualizacion] = useState('');

    
    const CalificacionesFiltrada = calificaciones.filter(calificacion => (
        calificacion.mercado.toLowerCase().includes(mercadoBusqueda.toLowerCase()) &&
        calificacion.origen.toLowerCase().includes(origenBusqueda.toLowerCase()) &&
        calificacion.periodo.toLowerCase().includes(periodoBusqueda.toLowerCase()) &&
        calificacion.ejercicio.toLowerCase().includes(ejercicio.toLowerCase()) &&
        calificacion.instrumento.toLowerCase().includes(instrumento.toLowerCase()) &&
        calificacion.fecha_pago.toLowerCase().includes(fecha_pago.toLowerCase()) &&
        calificacion.descripcion.toLowerCase().includes(descripcion.toLowerCase()) &&
        calificacion.secuencia_evento.toLowerCase().includes(secuencia_evento.toLowerCase()) &&
        calificacion.factor_actualizacion.toLowerCase().includes(factor_actualizacion.toLowerCase())
    ));

    return (
        <div className="mt-3">
            <table className="table table-bordered">
                <thead>
                    <tr className="table-row text-nowrap">
                        <th scope="col">Ejercicio</th>
                        <th scope="col">Instrumento</th>
                        <th scope="col">Fecha Pago</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Secuencia Evento</th>
                        <th scope="col">Factor de Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="filtros">
                       <td>
                            <input type="text" 
                                    id="ejercicio" 
                                    value={ejercicio}
                                    onChange={ e => setEjercicio(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                       <td>
                            <input type="text" 
                                    id="instrumento" 
                                    value={instrumento}
                                    onChange={ e => setInstrumento(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                       <td>
                            <input type="text" 
                                    id="fecha_pago" 
                                    value={fecha_pago}
                                    onChange={ e => setFechaPago(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                       <td>
                            <input type="text" 
                                    id="descripcion" 
                                    value={descripcion}
                                    onChange={ e => setDescripcion(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                       <td>
                            <input type="text" 
                                    id="secuencia_evento" 
                                    value={secuencia_evento}
                                    onChange={ e => setSecuenciaEvento(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                       <td>
                            <input type="text" 
                                    id="factor_actualizacion" 
                                    value={factor_actualizacion}
                                    onChange={ e => setFactorActualizacion(e.target.value)}
                                    />
                            <i class="bi bi-funnel"/>
                       </td>
                    </tr>
                    {CalificacionesFiltrada.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ejercicio}</td>
                            <td>{item.instrumento}</td>
                            <td>{item.fecha_pago}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.secuencia_evento}</td>
                            <td>{item.factor_actualizacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;