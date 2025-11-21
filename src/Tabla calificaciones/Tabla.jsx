import { useState } from "react";
import '../Estilos/tabla.css';

function Tabla({ mercadoBusqueda, origenBusqueda, periodoBusqueda, pendienteBusqueda, calificaciones, urlApi, cambioCalificaciones, manejarActualizar}) {

    const [ejercicio, setEjercicio] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [fecha_pago, setFechaPago] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [secuencia_evento, setSecuenciaEvento] = useState('');
    const [factor_actualizacion, setFactorActualizacion] = useState('');

    const [factor_08, setFactor_08] = useState('');
    const [factor_09, setFactor_09] = useState('');
    const [factor_10, setFactor_10] = useState('');
    const [factor_11, setFactor_11] = useState('');
    const [factor_12, setFactor_12] = useState('');
    const [factor_13, setFactor_13] = useState('');
    const [factor_14, setFactor_14] = useState('');
    const [factor_15, setFactor_15] = useState('');
    const [factor_16, setFactor_16] = useState('');
    const [factor_17, setFactor_17] = useState('');
    const [factor_18, setFactor_18] = useState('');
    const [factor_19, setFactor_19] = useState('');
    const [factor_20, setFactor_20] = useState('');
    const [factor_21, setFactor_21] = useState('');
    const [factor_22, setFactor_22] = useState('');
    const [factor_23, setFactor_23] = useState('');
    const [factor_24, setFactor_24] = useState('');
    const [factor_25, setFactor_25] = useState('');
    const [factor_26, setFactor_26] = useState('');
    const [factor_27, setFactor_27] = useState('');
    const [factor_28, setFactor_28] = useState('');
    const [factor_29, setFactor_29] = useState('');
    const [factor_30, setFactor_30] = useState('');
    const [factor_31, setFactor_31] = useState('');
    const [factor_32, setFactor_32] = useState('');
    const [factor_33, setFactor_33] = useState('');
    const [factor_34, setFactor_34] = useState('');
    const [factor_35, setFactor_35] = useState('');
    const [factor_36, setFactor_36] = useState('');
    const [factor_37, setFactor_37] = useState('');
    const [factor_38, setFactor_38] = useState('');




    const CalificacionesFiltrada = calificaciones.filter(calificacion => (
        String(calificacion.mercado).includes(mercadoBusqueda.toLowerCase()) &&
        String(calificacion.origen).includes(origenBusqueda.toLowerCase()) &&
        String(calificacion.periodo).includes(periodoBusqueda.toLowerCase()) &&
        String(calificacion.ejercicio).includes(ejercicio.toLowerCase()) &&
        calificacion.instrumento.toLowerCase().includes(instrumento.toLowerCase()) &&
        calificacion.fecha_pago.toLowerCase().includes(fecha_pago.toLowerCase()) &&
        calificacion.descripcion.toLowerCase().includes(descripcion.toLowerCase()) &&
        String(calificacion.secuencia_evento).includes(secuencia_evento.toLowerCase()) &&
        String(calificacion.factor_actualizacion).includes(factor_actualizacion.toLowerCase()) && 
        String(calificacion.factores[0]).includes(factor_08.toLowerCase()) &&
        String(calificacion.factores[1]).includes(factor_09.toLowerCase()) &&
        String(calificacion.factores[2]).includes(factor_10.toLowerCase()) &&
        String(calificacion.factores[3]).includes(factor_11.toLowerCase()) &&
        String(calificacion.factores[4]).includes(factor_12.toLowerCase()) &&
        String(calificacion.factores[5]).includes(factor_13.toLowerCase()) &&
        String(calificacion.factores[6]).includes(factor_14.toLowerCase()) &&
        String(calificacion.factores[7]).includes(factor_15.toLowerCase()) &&
        String(calificacion.factores[8]).includes(factor_16.toLowerCase()) &&
        String(calificacion.factores[9]).includes(factor_17.toLowerCase()) &&
        String(calificacion.factores[10]).includes(factor_18.toLowerCase()) &&
        String(calificacion.factores[11]).includes(factor_19.toLowerCase()) &&
        String(calificacion.factores[12]).includes(factor_20.toLowerCase()) &&
        String(calificacion.factores[13]).includes(factor_21.toLowerCase()) &&
        String(calificacion.factores[14]).includes(factor_22.toLowerCase()) &&
        String(calificacion.factores[15]).includes(factor_23.toLowerCase()) &&
        String(calificacion.factores[16]).includes(factor_24.toLowerCase()) &&
        String(calificacion.factores[17]).includes(factor_25.toLowerCase()) &&
        String(calificacion.factores[18]).includes(factor_26.toLowerCase()) &&
        String(calificacion.factores[19]).includes(factor_27.toLowerCase()) &&
        String(calificacion.factores[20]).includes(factor_28.toLowerCase()) &&
        String(calificacion.factores[21]).includes(factor_29.toLowerCase()) &&
        String(calificacion.factores[22]).includes(factor_30.toLowerCase()) &&
        String(calificacion.factores[23]).includes(factor_31.toLowerCase()) &&
        String(calificacion.factores[24]).includes(factor_32.toLowerCase()) &&
        String(calificacion.factores[25]).includes(factor_33.toLowerCase()) &&
        String(calificacion.factores[26]).includes(factor_34.toLowerCase()) &&
        String(calificacion.factores[27]).includes(factor_35.toLowerCase()) &&
        String(calificacion.factores[28]).includes(factor_36.toLowerCase()) &&
        String(calificacion.factores[29]).includes(factor_37.toLowerCase()) &&
        String(calificacion.factores[30]).includes(factor_38.toLowerCase())
    ));

    const eliminarCalificacion = async (id) => {
        if (!id) {
            console.log("No se proporcionó ID");
            return ;
        }
        try {
            const API = `${urlApi}/${id}`;
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
                        <th scope="col">Factor-08</th>
                        <th scope="col">Factor-09</th>
                        <th scope="col">factor-10</th>
                        <th scope="col">factor-11</th>
                        <th scope="col">Factor-12</th>
                        <th scope="col">Factor-13</th>
                        <th scope="col">Factor-14</th>
                        <th scope="col">Factor-15</th>
                        <th scope="col">Factor-16</th>
                        <th scope="col">Factor-17</th>
                        <th scope="col">Factor-18</th>
                        <th scope="col">Factor-19</th>
                        <th scope="col">Factor-20</th>
                        <th scope="col">Factor-21</th>
                        <th scope="col">Factor-22</th>
                        <th scope="col">Factor-23</th>
                        <th scope="col">Factor-24</th>
                        <th scope="col">Factor-25</th>
                        <th scope="col">Factor-26</th>
                        <th scope="col">Factor-27</th>
                        <th scope="col">Factor-28</th>
                        <th scope="col">Factor-29</th>
                        <th scope="col">Factor-30</th>
                        <th scope="col">Factor-31</th>
                        <th scope="col">Factor-32</th>
                        <th scope="col">Factor-33</th>
                        <th scope="col">Factor-34</th>
                        <th scope="col">Factor-35</th>
                        <th scope="col">Factor-36</th>
                        <th scope="col">Factor-37</th>
                        <th scope="col">Factor-38</th>
                    </tr>
                    <tr className="filtros">
                        <td>
                            <h2>Filtros</h2>
                        </td>
                        <td>
                            <input type="number" 
                                    id="ejercicio" 
                                    value={ejercicio}
                                    onChange={ e => setEjercicio(e.target.value)}
                                    />
                        </td>
                        <td>
                            <input type="text" 
                                    id="instrumento" 
                                    value={instrumento}
                                    onChange={ e => setInstrumento(e.target.value)}
                                    />
                        </td>
                        <td>
                            <input type="text" 
                                    id="fecha_pago" 
                                    value={fecha_pago}
                                    onChange={ e => setFechaPago(e.target.value)}
                                    />
                        </td>
                        <td>
                            <input type="text" 
                                    id="descripcion" 
                                    value={descripcion}
                                    onChange={ e => setDescripcion(e.target.value)}
                                    />
                        </td>
                        <td>
                            <input type="number" 
                                    id="secuencia_evento" 
                                    value={secuencia_evento}
                                    onChange={ e => setSecuenciaEvento(e.target.value)}
                                    />
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_actualizacion" 
                                    value={factor_actualizacion}
                                    onChange={ e => setFactorActualizacion(e.target.value)}
                                    />      
                        </td>

                        
                        <td>
                            <input type="number" 
                                    id="factor_08" 
                                    value={factor_08}
                                    onChange={ e => setFactor_08(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_09" 
                                    value={factor_09}
                                    onChange={ e => setFactor_09(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_10" 
                                    value={factor_10}
                                    onChange={ e => setFactor_10(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_11" 
                                    value={factor_11}
                                    onChange={ e => setFactor_11(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_12" 
                                    value={factor_12}
                                    onChange={ e => setFactor_12(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_13" 
                                    value={factor_13}
                                    onChange={ e => setFactor_13(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_14" 
                                    value={factor_14}
                                    onChange={ e => setFactor_14(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_15" 
                                    value={factor_15}
                                    onChange={ e => setFactor_15(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_16" 
                                    value={factor_16}
                                    onChange={ e => setFactor_16(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_17" 
                                    value={factor_17}
                                    onChange={ e => setFactor_17(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_18" 
                                    value={factor_18}
                                    onChange={ e => setFactor_18(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_19" 
                                    value={factor_19}
                                    onChange={ e => setFactor_19(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_20" 
                                    value={factor_20}
                                    onChange={ e => setFactor_20(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_21" 
                                    value={factor_21}
                                    onChange={ e => setFactor_21(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_22" 
                                    value={factor_22}
                                    onChange={ e => setFactor_22(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_23" 
                                    value={factor_23}
                                    onChange={ e => setFactor_23(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_24" 
                                    value={factor_24}
                                    onChange={ e => setFactor_24(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_25" 
                                    value={factor_25}
                                    onChange={ e => setFactor_25(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_26" 
                                    value={factor_26}
                                    onChange={ e => setFactor_26(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_27" 
                                    value={factor_27}
                                    onChange={ e => setFactor_27(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_28" 
                                    value={factor_28}
                                    onChange={ e => setFactor_28(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_29" 
                                    value={factor_29}
                                    onChange={ e => setFactor_29(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_30" 
                                    value={factor_30}
                                    onChange={ e => setFactor_30(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_31" 
                                    value={factor_31}
                                    onChange={ e => setFactor_31(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_32" 
                                    value={factor_32}
                                    onChange={ e => setFactor_32(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_33" 
                                    value={factor_33}
                                    onChange={ e => setFactor_33(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_34" 
                                    value={factor_34}
                                    onChange={ e => setFactor_34(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_35" 
                                    value={factor_35}
                                    onChange={ e => setFactor_35(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_36" 
                                    value={factor_36}
                                    onChange={ e => setFactor_36(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_37" 
                                    value={factor_37}
                                    onChange={ e => setFactor_37(e.target.value)}
                                    />      
                        </td>
                        <td>
                            <input type="number" 
                                    id="factor_38" 
                                    value={factor_38}
                                    onChange={ e => setFactor_38(e.target.value)}
                                    />      
                        </td>
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
                            <td>{item.factores[0]}</td>
                            <td>{item.factores[1]}</td>
                            <td>{item.factor_10}</td>
                            <td>{item.factor_11}</td>
                            <td>{item.factor_12}</td>
                            <td>{item.factor_13}</td>
                            <td>{item.factor_14}</td>
                            <td>{item.factor_15}</td>
                            <td>{item.factor_16}</td>
                            <td>{item.factor_17}</td>
                            <td>{item.factor_18}</td>
                            <td>{item.factor_19}</td>
                            <td>{item.factor_20}</td>
                            <td>{item.factor_21}</td>
                            <td>{item.factor_22}</td>
                            <td>{item.factor_23}</td>
                            <td>{item.factor_24}</td>
                            <td>{item.factor_25}</td>
                            <td>{item.factor_26}</td>
                            <td>{item.factor_27}</td>
                            <td>{item.factor_28}</td>
                            <td>{item.factor_29}</td>
                            <td>{item.factor_30}</td>
                            <td>{item.factor_31}</td>
                            <td>{item.factor_32}</td>
                            <td>{item.factor_33}</td>
                            <td>{item.factor_34}</td>
                            <td>{item.factor_35}</td>
                            <td>{item.factor_36}</td>
                            <td>{item.factor_37}</td>
                            <td>{item.factor_38}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;