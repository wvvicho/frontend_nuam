import { useEffect, useState } from "react";

function FormularioFactores ({mercados ,manejarCerrar, manejarVolver, manejarEnvio, calificacion}) {
    
    const [mercado, setMercado] = useState(calificacion.mercado);
    const [instrumento, setInstrumento] = useState(calificacion.instrumento);
    const [valor_historico, setValorHistorico] = useState(calificacion.valor_historico)
    const [fecha_pago, setFechaPago] = useState(calificacion.fecha_pago);
    const [descripcion, setDescripcion] = useState(calificacion.descripcion);
    const [secuencia_evento, setSecuenciaEvento] = useState(calificacion.secuencia_evento);
    const [anio, setAnio] = useState(calificacion.anio);
    const [ingreso_por_montos, setIngresoPorMontos] = useState('');


    /*useEffect(() => {
        setMercado(calificacion.mercado);
        setInstrumento(calificacion.instrumento);
        setValorHistorico(calificacion.valor_historico);
        setFechaPago(calificacion.fecha_pago);
        setDescripcion(calificacion.descripcion);
        setSecuenciaEvento(calificacion.secuencia_evento);
        setAnio(calificacion.anio);

    }, [calificacion]);*/

    return (
        <div>
            <form className="form">
                {/*Formulario rellenado con los valores de FormularioIngreso*/}
                <div className="d-flex flex-wrap justify-content-between">

                    <div className="d-flex flex-column gap-2 col-4 pe-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="mercado" className="form-label text-nowrap me-2">Mercado</label>
                            <select name="mercados" id="mercados" className="form-select border-black w-50" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                                <option></option>
                                {mercados.map( (mercado, index) => (
                                    <option key={index} value={mercado}>{mercado.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="fecha_pago" className="form-label text-nowrap me-2">Fecha Pago</label>
                            <input type="date" name="fecha_pago" id="fecha_pago" className="form-control w-50 border-black" value={fecha_pago} onChange={(e) => setFechaPago(e.target.value)}/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="anio" className="form-label text-nowrap me-2">Año</label>
                            <input type="number" name="anio" id="anio" className="form-control w-50 border-black" value={anio} onChange={(e) => setAnio(e.target.value)}/>
                        </div> 
                    </div>

                    <div className="d-flex flex-column gap-2 col-4 pe-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="instrumento" className="form-label text-nowrap me-2">Instrumento</label>
                            <input type="text" name="instrumento" id="instrumento" className="form-control w-50 border-black" value={instrumento} onChange={(e) => setInstrumento(e.target.value)}/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between align-self-start w-100">
                            <label htmlFor="descripcion" className="form-label text-nowrap me-2">Descripción</label>
                            <textarea name="descripcion" id="descripcion" className="form-control w-50 border-black" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-start w-100">
                            <label htmlFor="ingreso_por_montos" className="form-check-label text-nowrap me-2">Ingreso por Montos</label>
                            <input type="checkbox" name="ingreso_por_montos" id="ingreso_por_montos" className="form-check-input border-black" value={ingreso_por_montos} onChange={(e) => setIngresoPorMontos(e.target.value)}/>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2 col-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="valor_historico" className="form-label text-nowrap me-2">Valor Histórico</label>
                            <input type="number" name="valor_historico" id="valor_historico" className="form-control w-50 border-black" value={valor_historico} onChange={(e) => setValorHistorico(e.target.value)}/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="secuencia_evento" className="form-label text-nowrap me-2">Secuencia Evento</label>
                            <input type="number" name="secuencia_evento" id="secuencia_evento" className="form-control w-50 border-black" value={secuencia_evento} onChange={(e) => setSecuenciaEvento(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <hr />
                {/*Formulario de Factores*/}
                <div>
                    <div className="d-flex justify-content-between">

                        <div className="d-flex flex-column gap-2 col-4 pe-3">
                            {/*Factor 08 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_08" className="form-label me-2">Factor-08 No Constitutiva de Renta No Acogido a Impto.</label>
                                <input type="number" name="factor_08" id="factor_08" className="form-control border-black" />
                            </div>

                            {/*Factor 11 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_11" className="form-label me-2">Factor-11 Incremento Impuesto 1ra Categoría</label>
                                <input type="number" name="factor_11" id="factor_11" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 14 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_14" className="form-label me-2">Factor-14 Impto. 1ra Categ. Exento GI. Comp. Sin Devolución</label>
                                <input type="number" name="factor_14" id="factor_14" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 17 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_17" className="form-label me-2">Factor-17 No Constitutiva de Renta Devolución de Capital Art.17</label>
                                <input type="number" name="factor_17" id="factor_17" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 20 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_20" className="form-label me-2">Factor-20 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_20" id="factor_20" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 23 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_23" className="form-label me-2">Factor-23 Con Derecho a Devolución</label>
                                <input type="number" name="factor_23" id="factor_23" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 26 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_26" className="form-label me-2">Factor-26 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_26" id="factor_26" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 29 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_29" className="form-label me-2">Factor-29 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_29" id="factor_29" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 32 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_32" className="form-label me-2">Factor-32 Con Derecho a Devolución</label>
                                <input type="number" name="factor_32" id="factor_32" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 35 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_35" className="form-label me-2">Factor-35 Tasa Efectiva Del Cred. Del FUT (TEF)</label>
                                <input type="number" name="factor_35" id="factor_35" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 38 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_38" className="form-label me-2">UI_FACTOR_38_DECRIPCIÓN</label>
                                <input type="number" name="factor_38" id="factor_38" className="form-control w-50 border-black" />
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-2 col-4 pe-3">        
                            {/*Factor 09 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_09" className="form-label me-2">Factor-09 Impto. 1ra Categ. Afecto GI. Comp. Con Devolución</label>
                                <input type="number" name="factor_09" id="factor_09" className="form-control border-black" />
                            </div>

                            {/*Factor 12 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_12" className="form-label me-2">Factor-12 Impto. 1ra Categ. Exento GI. Comp. Con Devolución</label>
                                <input type="number" name="factor_12" id="factor_12" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 15 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_15" className="form-label me-2">Factor-15 Impto. Créditos pro Impuestos Externos</label>
                                <input type="number" name="factor_15" id="factor_15" className="form-control w-50 border-black" />
                            </div>

                            {/*Rentas Exentas */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="rentas_exentas" className="form-label me-2">Factor-18 Rentas Exentas de Impto. GC Y/O Impto. Adicional</label>
                                <input type="number" name="rentas_exentas" id="rentas_exentas" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 21 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_21" className="form-label me-2">Factor-21 Con Derecho a Devolución</label>
                                <input type="number" name="factor_21" id="factor_21" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 24 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_24" className="form-label me-2">Factor-24 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_24" id="factor_24" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 27 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_26" className="form-label me-2">Factor-27 Con Derecho a Devolución</label>
                                <input type="number" name="factor_27" id="factor_27" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 30 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_30" className="form-label me-2">Factor-30 Con Derecho a Devolución</label>
                                <input type="number" name="factor_30" id="factor_30" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 33 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_33" className="form-label me-2">Factor-33 Crédito por IPE</label>
                                <input type="number" name="factor_33" id="factor_33" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 36 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_36" className="form-label me-2">Factor-36 Tasa Efectiva Del Cred. Del FUNT (TEX)</label>
                                <input type="number" name="factor_36" id="factor_36" className="form-control w-50 border-black" />
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-2 col-4">
                            {/*Factor 10 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_10" className="form-label me-2">Factor-10 Impuesto Tasa Adicional Exento Art. 21</label>
                                <input type="number" name="factor_10" id="factor_10" className="form-control border-black" />
                            </div>

                            {/*Factor 13 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_13" className="form-label me-2">Factor-13 Impto. 1ra Categ. Afecto GI. Comp. Sin Devolución</label>
                                <input type="number" name="factor_13" id="factor_13" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 16 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_16" className="form-label me-2">Factor-16 No Constitutiva de Renta Acogido a Impto.</label>
                                <input type="number" name="factor_16" id="factor_16" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 19A */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_19a" className="form-label me-2">Factor-19A Ingreso no Constitutivos de Renta</label>
                                <input type="number" name="factor_19a" id="factor_19a" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 22 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_22" className="form-label me-2">Factor-22 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_22" id="factor_22" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 25 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_25" className="form-label me-2">Factor-25 Con Derecho a Devolución</label>
                                <input type="number" name="factor_25" id="factor_25" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 28 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_28" className="form-label me-2">Factor-28 Crédito por IPE</label>
                                <input type="number" name="factor_28" id="factor_28" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 31 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_31" className="form-label me-2">Factor-31 Sin Derecho a Devolución</label>
                                <input type="number" name="factor_31" id="factor_31" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 34 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_34" className="form-label me-2">Factor-34 Cred. Por Impto. Tasa Adicional, Ex Art. 21 LIR</label>
                                <input type="number" name="factor_34" id="factor_34" className="form-control w-50 border-black" />
                            </div>

                            {/*Factor 37 */}
                            <div className="d-flex align-items-center justify-content-between">
                                <label htmlFor="factor_37" className="form-label me-2">Factor-37 Devolución de Capital Art. 17 num 7 LIR</label>
                                <input type="number" name="factor_37" id="factor_37" className="form-control w-50 border-black" />
                            </div>
                        </div>

                    </div>
                </div>
                <hr />
                <div className="d-flex flex-row gap-2 justify-content-end mt-3">
                    <button className="btn btn-secondary" onClick={manejarVolver}>Volver</button>
                    <button className="btn btn-danger" onClick={() => {manejarCerrar(); manejarVolver();}}>Cancelar</button>
                </div>
            </form>
        </div>
    )
};

export default FormularioFactores;