import { useState } from "react";

function Tabla({ mercadoBusqueda, origenBusqueda, periodoBusqueda, pendienteBusqueda }) {

    const [ejercicio, setEjercicio] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [fecha_pago, setFechaPago] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [secuencia_evento, setSecuenciaEvento] = useState('');
    const [factor_actualizacion, setFactorActualizacion] = useState('');

    const CalificacionesEj = [
        {
            mercado:'Mercado1',
            origen:'Origen1',
            periodo:'PeriodoComercial1',
            ejercicio:'2023',
            instrumento:'A',
            fecha_pago:'03-11-2025',
            descripcion:'DIVIDENDO US$ 1',
            secuencia_evento:'1110',
            factor_actualizacion:'1'
        },
        {
            mercado:'Mercado2',
            origen:'Origen2',
            periodo:'PeriodoComercial2',
            ejercicio:'2024',
            instrumento:'B',
            fecha_pago:'02-11-2025',
            descripcion:'DIVIDENDO US$ 2',
            secuencia_evento:'1111',
            factor_actualizacion:'2'
        },
        {
            mercado:'Mercado3',
            origen:'Origen3',
            periodo:'PeriodoComercial3',
            ejercicio:'2025',
            instrumento:'C',
            fecha_pago:'01-11-2025',
            descripcion:'DIVIDENDO US$ 3',
            secuencia_evento:'1112',
            factor_actualizacion:'3'
        }
    ];
    
    const CalificacionesEjFiltradas = CalificacionesEj.filter(calificacion => (
        calificacion.mercado.toLocaleLowerCase().includes(mercadoBusqueda.toLowerCase()) &&
        calificacion.origen.toLocaleLowerCase().includes(origenBusqueda.toLowerCase()) &&
        calificacion.periodo.toLocaleLowerCase().includes(periodoBusqueda.toLowerCase()) &&
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
                    {CalificacionesEjFiltradas.map((item, index) => (
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