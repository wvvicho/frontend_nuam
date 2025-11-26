import { useCallback, useEffect, useState } from "react";

function FormularioFactores ({mercados ,manejarCerrar, manejarVolver, manejarEnvio, calificacion, manejarMontos, factoresCalculados}) {
    
    const factores_llaves = [
        'factor_08', 'factor_09', 'factor_10', 'factor_11', 'factor_12',
        'factor_13', 'factor_14', 'factor_15', 'factor_16', 'factor_17',
        'factor_18', 'factor_19', 'factor_20', 'factor_21', 'factor_22',
        'factor_23', 'factor_24', 'factor_25', 'factor_26', 'factor_27',
        'factor_28', 'factor_29', 'factor_30', 'factor_31', 'factor_32',
        'factor_33', 'factor_34', 'factor_35', 'factor_36', 'factor_37'
    ];

    const factores_label = {
        factor_08: 'Factor-08 No Constitutiva de Renta No Acogido a Impto.',
        factor_09: 'Factor-09 Impto. 1ra Categ. Afecto GI. Comp. Con Devolución',
        factor_10: 'Factor-10 Impuesto Tasa Adicional Exento Art. 21',
        factor_11: 'Factor-11 Incremento Impuesto 1ra Categoría',
        factor_12: 'Factor-12 Impto. 1ra Categ. Exento GI. Comp. Con Devolución',
        factor_13: 'Factor-13 Impto. 1ra Categ. Afecto GI. Comp. Sin Devolución',
        factor_14: 'Factor-14 Impto. 1ra Categ. Exento GI. Comp. Sin Devolución',
        factor_15: 'Factor-15 Impto. Créditos pro Impuestos Externos',
        factor_16: 'Factor-16 No Constitutiva de Renta Acogido a Impto.',
        factor_17: 'Factor-17 No Constitutiva de Renta Devolución de Capital Art.17',
        factor_18: 'Factor-18 Rentas Exentas de Impto. GC Y/O Impto. Adicional',
        factor_19: 'Factor-19 Ingreso no Constitutivos de Renta', 
        factor_20: 'Factor-20 Sin Derecho a Devolución',
        factor_21: 'Factor-21 Con Derecho a Devolución',
        factor_22: 'Factor-22 Sin Derecho a Devolución',
        factor_23: 'Factor-23 Con Derecho a Devolución',
        factor_24: 'Factor-24 Sin Derecho a Devolución',
        factor_25: 'Factor-25 Con Derecho a Devolución',
        factor_26: 'Factor-26 Sin Derecho a Devolución',
        factor_27: 'Factor-27 Con Derecho a Devolución',
        factor_28: 'Factor-28 Crédito por IPE',
        factor_29: 'Factor-29 Sin Derecho a Devolución',
        factor_30: 'Factor-30 Con Derecho a Devolución',
        factor_31: 'Factor-31 Sin Derecho a Devolución',
        factor_32: 'Factor-32 Con Derecho a Devolución',
        factor_33: 'Factor-33 Crédito por IPE',
        factor_34: 'Factor-34 Cred. Por Impto. Tasa Adicional, Ex Art. 21 LIR',
        factor_35: 'Factor-35 Tasa Efectiva Del Cred. Del FUT (TEF)',
        factor_36: 'Factor-36 Tasa Efectiva Del Cred. Del FUNT (TEX)',
        factor_37: 'Factor-37 Devolución de Capital Art. 17 num 7 LIR',
        factor_38: 'UI_FACTOR_38_DECRIPCIÓN',
        };


        const [mercado, setMercado] = useState(calificacion.mercado ? calificacion.mercado.id : '');
        const [instrumento, setInstrumento] = useState(calificacion.instrumento);
        const [valor_historico, setValorHistorico] = useState(calificacion.valor_historico)
        const [fecha_pago, setFechaPago] = useState(calificacion.fecha_pago);
        const [descripcion, setDescripcion] = useState(calificacion.descripcion);
        const [secuencia_evento, setSecuenciaEvento] = useState(calificacion.secuencia_evento);
        const [anio, setAnio] = useState(calificacion.anio);
        
        const [ingreso_por_montos, setIngresoPorMontos] = useState(false);
        
        const inicializarFactores = (factores = []) => {
            const factoresIniciales = {};
            factores_llaves.forEach((key, index) => {
                factoresIniciales[key] = factores[index] ?? '';
            });
            return factoresIniciales; 
        };
        
        const [factores, setFactores] = useState(() => inicializarFactores(calificacion.factores));
        
        
        // manejar montos y factores por separado correctamente
        const manejarCambioFactor = useCallback((key, value) => {
        
            const valorEstandarizado = value.replace(/,/g, '.');
        
            let valorFinal;
        
            if (ingreso_por_montos) {
        
                // Montos solo aceptan dígitos
                const regexMontos = /[^0-9]/g; 
                valorFinal = valorEstandarizado.replace(regexMontos, '');
                
            } else {
        
                // Para factores permitimos 1 entero + hasta 8 decimales
                const valorPaso1 = valorEstandarizado.replace(/[^0-9.]/g, ''); 
                const valorPaso2 = valorPaso1.replace(/(\..*)\./g, '$1'); 
        
                const partes = valorPaso2.split('.');
                let enteros = partes[0] || '';
                let decimales = partes[1] || '';
        
                if (enteros.length > 1) {
                    enteros = enteros.slice(0, 1); // SOLO 1 ENTERO
                }
                
                if (decimales.length > 8) {
                    decimales = decimales.slice(0, 8); // MAX 8 DECIMALES
                }
                
                let valorReconstruido = enteros;
                if (decimales.length > 0) {
                    valorReconstruido += '.' + decimales;
                }
        
                valorFinal = valorReconstruido;
            }
        
            setFactores(prevFactores => ({
                ...prevFactores,
                [key] : valorFinal
            }));
        
        }, [ingreso_por_montos]);
        
        
        const manejarCheck = (e) => {
            setIngresoPorMontos(e.target.checked); 
        };
        
        
        const [errorIngreso, setErrorIngreso] = useState(false);

        
        
        const manejarCalcular = () => {
            setErrorIngreso(null);
        
            // validación simple para montos (>=0)
            const factoresValidos = Object.values(factores).every(factor =>
                String(factor) !== '' && Number(factor) >= 0
            );
        
            if (factoresValidos) {
                const montosEnviar = factores_llaves.map(key => parseInt(factores[key]));
                manejarMontos(montosEnviar);
            } else {
                setErrorIngreso("Por favor ingrese todos los montos (deben ser mayor o igual a 0)");
            }
        };
        
        useEffect(() => {
            if (factoresCalculados && Object.keys(factoresCalculados).length > 0) {
                setFactores(factoresCalculados);
                setIngresoPorMontos(false);
            }
        }, [factoresCalculados]);
        
        
        const manejarInt = (e) => {
            if (e.key === '.' || e.key === ',') {
                e.preventDefault();
            }
        };
        
        
        const manejarSubmit = (e) => {
            e.preventDefault();
            setErrorIngreso('');
        
            const camposFormIngreso = [mercado, instrumento, valor_historico, fecha_pago, secuencia_evento, anio];
            const camposValidos = camposFormIngreso.every(campo => String(campo) != '');
            const fecha_valida = fecha_pago <= calificacion.fechaActualizacion;
        
        
            // validación depende del modo
            const factoresValidos = Object.values(factores).every(factor => {
                const factorString = String(factor).trim();
                
                if (factorString === '') return false;
        
                const valor = parseFloat(factorString.replace(/,/g, '.'));
                if (isNaN(valor)) return false;
        
                // SI ES MONTO
                if (ingreso_por_montos) {
                    return valor >= 0; // aceptar 0
                }
        
                // SI ES FACTOR
                if (valor < 0 || valor > 1) return false;
        
                const decimales = (factorString.split('.')[1] || '');
                if (decimales.length > 8) return false;
        
                return true;
            });
        
        
            if (!camposValidos || !factoresValidos || !fecha_valida) {
                setErrorIngreso(
                    'Por favor rellene todos los campos antes de ingresar, los factores deben tener como máximo 1 entero y 8 decimales, los factores deben tener un valor de entre 0 y 1, la fecha de pago no debe ser mayor a la fecha de actualización'
                );
                return;
            }
        
            const factoresEnviar = factores_llaves.map(key => parseFloat(factores[key]));
        
            const datos = {
                id: calificacion.id || undefined,
                ejercicio: parseInt(calificacion.ejercicio, 10),
                instrumento: calificacion.instrumento,
                fecha_pago: calificacion.fecha_pago,
                origen: parseInt(calificacion.origen?.id || calificacion.origen.id, 10), 
                mercado: parseInt(mercado, 10),
                periodo: parseInt(calificacion.periodo, 10),
                secuencia_evento: parseInt(calificacion.secuencia_evento, 10),
                factor_actualizacion: parseInt(calificacion.factor_actualizacion, 10),
                dividendo: parseInt(calificacion.dividendo, 10),
                valor_historico: parseFloat(calificacion.valor_historico),
                fechaActualizacion: calificacion.fechaActualizacion,
                anio: parseInt(calificacion.anio, 10),
                descripcion: calificacion.descripcion,
                factores: factoresEnviar,
            }
        
            manejarEnvio(datos);
        };
        
        
        // usa input type="text" para no romper los decimales y ceros
        const FactoresInput = (key) => (
            <input 
                type="text" 
                name={key} 
                id={key} 
                className="form-control border-black" 
                value={factores[key]} 
                onChange={e => manejarCambioFactor(key, e.target.value)}
            />     
        );
        

        //Columnas factores
        const columna1Factores = factores_llaves.slice(0, 10);
        const columna2Factores = factores_llaves.slice(10, 20);
        const columna3Factores = factores_llaves.slice(20,30);



    return (
        <div>
           <form className="form" onSubmit={manejarSubmit}>

                {/* --- FORM PRINCIPAL (igual al formulario de ingreso) --- */}
                <div className="row">

                    <div className="col-lg-4">

                        {/* Mercado */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Mercado</label>
                            <div className="col-sm-8">
                                <select className="form-control form-control-sm" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                                    <option>Seleccione mercado</option>
                                    {mercados.map((m, index) => (
                                        <option key={index} value={m.id}>{m.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Fecha Pago */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Fecha Pago</label>
                            <div className="col-sm-8">
                                <input type="date" className="form-control form-control-sm"
                                    value={fecha_pago} onChange={(e) => setFechaPago(e.target.value)} />
                            </div>
                        </div>

                        {/* Año */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Año</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control form-control-sm"
                                    onKeyDown={manejarInt}
                                    value={anio} onChange={(e) => setAnio(e.target.value)} />
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">

                        {/* Instrumento */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Instrumento</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm"
                                    value={instrumento} onChange={(e) => setInstrumento(e.target.value)} />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Descripción</label>
                            <div className="col-sm-8">
                                <textarea className="form-control form-control-sm"
                                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Por Montos</label>
                            <div className="col-sm-8 d-flex">
                                <input type="checkbox" className="form-check-input"
                                    checked={ingreso_por_montos} onChange={manejarCheck} />
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">

                        {/* Valor Histórico */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Valor Histórico</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control form-control-sm"
                                    value={valor_historico} onChange={(e) => setValorHistorico(e.target.value)} />
                            </div>
                        </div>

                        {/* Secuencia Evento */}
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label">Secuencia</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control form-control-sm"
                                    onKeyDown={manejarInt}
                                    value={secuencia_evento} onChange={(e) => setSecuenciaEvento(e.target.value)} />
                            </div>
                        </div>

                    </div>

                </div>

                <hr />

                {/* ---------- FACTORES (3 COLUMNAS ESTILO FORM INGRESO) ---------- */}
                <div className="row">

                    <div className="col-lg-4">
                        {columna1Factores.map(key => (
                            <div key={key} className="mb-3">
                                <label className="form-label fw-semibold text-truncate">
                                    {factores_label[key]}
                                </label>
                                {FactoresInput(key, factores_label[key], true)}
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-4">
                        {columna2Factores.map(key => (
                            <div key={key} className="mb-3">
                                <label className="form-label fw-semibold text-truncate">
                                    {factores_label[key]}
                                </label>
                                {FactoresInput(key, factores_label[key], true)}
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-4">
                        {columna3Factores.map(key => (
                            <div key={key} className="mb-3">
                                <label className="form-label fw-semibold text-truncate">
                                    {factores_label[key]}
                                </label>
                                {FactoresInput(key, factores_label[key], true)}
                            </div>
                        ))}
                    </div>

                </div>
                <hr />

                {/* BOTONES */}
                <div className="d-flex justify-content-end gap-2 mt-3">
                    {errorIngreso && <p className="text-danger me-auto">{errorIngreso}</p>}

                    <button className="btn btn-secondary" type="button" onClick={manejarVolver}>Volver</button>
                    <button className="btn btn-danger" type="button" onClick={() => { manejarCerrar(); manejarVolver(); }}>Cancelar</button>

                    {ingreso_por_montos ? (
                        <button className="btn btn-secondary" type="button" onClick={manejarCalcular}>Calcular</button>
                    ) : (
                        <button className="btn btn-success" type="submit">Enviar</button>
                    )}
                </div>

            </form>

        </div>
    )
};

export default FormularioFactores;