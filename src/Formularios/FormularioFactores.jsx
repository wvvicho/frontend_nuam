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

    const manejarCambioFactor = useCallback((key, value) => {
        const value1 = value.replace(/[^0-9.]/g, '');
        
        const value2 = value1.replace(/(\..*)\./g, '$1');

        const dividir = value2.split('.');

        let enteros = dividir[0] || '';
        let decimales = dividir[1] || '';

        if (enteros.length > 1) {
            enteros = enteros.slice(0, 1);
        }

        if (decimales.length > 9) {
            decimales = decimales.slice(0, 9);
        }
        
        let valueFinal = enteros;

        if (value2.includes('.') || decimales.length > 0) {
            valueFinal += '.' + decimales
        }

        setFactores(prevFactores => ({
            ...prevFactores,
            [key] : valueFinal
        }));
    }, []);

    const manejarCheck = (e) => {
        setIngresoPorMontos(e.target.checked); 
    };


    const [errorIngreso, setErrorIngreso] = useState(false);


    const manejarCalcular = () => {
        setErrorIngreso(null);
        const factoresValidos = Object.values(factores).every(factor => String(factor) != '' && factor > 0);

        if (factoresValidos){
            const montosEnviar = factores_llaves.map(key => parseInt(factores[key]));
            manejarMontos(montosEnviar);
        } else {
            setErrorIngreso("Por favor ingrese todos los montos (deben ser mayor a 0)")
        }
        
    };

    useEffect(() => {
        if (factoresCalculados && Object.keys(factoresCalculados).length > 0){
            setFactores(factoresCalculados);
            setIngresoPorMontos(false);
        }
    }, [factoresCalculados])

    const manejarInt = (e) => {
        if (e.key === '.' || e.key === ','){
            e.preventDefault();
        }
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        setErrorIngreso('');

        const camposFormIngreso = [mercado, instrumento, valor_historico, fecha_pago, secuencia_evento, anio];
        const camposValidos = camposFormIngreso.every(campo => String(campo) != '');

        const fecha_valida = fecha_pago < calificacion.fechaActualizacion;

        const factoresValidos = Object.values(factores).every(factor => String(factor) != '' && factor.length > 0 && factor.length < 9 && factor > 0 && factor <= 1);

        if (!camposValidos || !factoresValidos || !fecha_valida){
            setErrorIngreso('Por favor rellene todos los campos antes de ingresar, los factores deben tener como máximo 1 entero y 8 decimales, los factores deben tener un valor de entre 0 y 1, la fecha de pago no debe ser mayor a la fecha de actualización');
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

        console.log(datos);
        manejarEnvio(datos);
        
    };

        const FactoresInput = (key, label) => (
            <div className="d-flex align-items-center justify-content-between" key={key}>
                <label htmlFor={key} className="form-label me-2">{label}</label>
                <input type="number" name={key} id={key} className="form-control border-black" value={factores[key]} onChange={e => manejarCambioFactor(key, e.target.value)}/>
            </div>
        );

        //Columnas factores
        const columna1Factores = factores_llaves.slice(0, 11);
        const columna2Factores = factores_llaves.slice(11, 21);
        const columna3Factores = factores_llaves.slice(21);


    return (
        <div>
            <form className="form" onSubmit={manejarSubmit}>
                {/*Formulario rellenado con los valores de FormularioIngreso*/}
                <div className="d-flex flex-wrap justify-content-between">

                    <div className="d-flex flex-column gap-2 col-4 pe-3">
                        {/*Mercado*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="mercado" className="form-label text-nowrap me-2">Mercado</label>
                            <select name="mercados" id="mercados" className="form-select border-black w-50" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                                <option>Seleccione mercado</option>
                                {mercados.map( (mercado, index) => (
                                    <option key={index} value={mercado.id}>{mercado.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/*Fecha_pago*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="fecha_pago" className="form-label text-nowrap me-2">Fecha Pago</label>
                            <input type="date" name="fecha_pago" id="fecha_pago" className="form-control w-50 border-black" value={fecha_pago} onChange={(e) => setFechaPago(e.target.value)}/>
                        </div>
                        {/*Año*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="anio" className="form-label text-nowrap me-2">Año</label>
                            <input type="number" step={1} onKeyDown={manejarInt} name="anio" id="anio" className="form-control w-50 border-black" value={anio} onChange={(e) => setAnio(e.target.value)}/>
                        </div> 
                    </div>

                    <div className="d-flex flex-column gap-2 col-4 pe-3">
                        {/*Instrumento*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="instrumento" className="form-label text-nowrap me-2">Instrumento</label>
                            <input type="text" name="instrumento" id="instrumento" className="form-control w-50 border-black" value={instrumento} onChange={(e) => setInstrumento(e.target.value)}/>
                        </div>
                        {/*Descripción*/}
                        <div className="d-flex align-items-center justify-content-between align-self-start w-100">
                            <label htmlFor="descripcion" className="form-label text-nowrap me-2">Descripción</label>
                            <textarea name="descripcion" id="descripcion" className="form-control w-50 border-black" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                        </div>
                        {/*Ingreso por montos*/}
                        <div className="d-flex align-items-center justify-content-start w-100">
                            <label htmlFor="ingreso_por_montos" className="form-check-label text-nowrap me-2">Ingreso por Montos</label>
                            <input type="checkbox" name="ingreso_por_montos" id="ingreso_por_montos" className="form-check-input border-black" checked={ingreso_por_montos} onChange={(e) => manejarCheck(e)}/>
                        </div>
                    </div>
                    
                    <div className="d-flex flex-column gap-2 col-4">
                        {/*Valor histórico*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="valor_historico" className="form-label text-nowrap me-2">Valor Histórico</label>
                            <input type="number" name="valor_historico" id="valor_historico" className="form-control w-50 border-black" value={valor_historico} onChange={(e) => setValorHistorico(e.target.value)}/>
                        </div>
                        {/*Secuencia evento*/}
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="secuencia_evento" className="form-label text-nowrap me-2">Secuencia Evento</label>
                            <input type="number" step={1} onKeyDown={manejarInt} name="secuencia_evento" id="secuencia_evento" className="form-control w-50 border-black" value={secuencia_evento} onChange={(e) => setSecuenciaEvento(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <hr />
                {/*Formulario de Factores*/}
                <div>
                    <div className="d-flex justify-content-between">

                        <div className="d-flex flex-column gap-2 col-4 pe-3">
                            {columna1Factores.map(key => FactoresInput(key, factores_label[key]))}
                        </div>

                        <div className="d-flex flex-column gap-2 col-4 pe-3">
                            {columna2Factores.map(key => FactoresInput(key, factores_label[key]))}
                        </div>

                        <div className="d-flex flex-column gap-2 col-4 pe-3">
                            {columna3Factores.map(key => FactoresInput(key, factores_label[key]))}
                        </div>

                    </div>
                </div>
                <hr />
                <div className="d-flex flex-row gap-2 justify-content-end mt-3">
                    {errorIngreso 
                    ? 
                        <p className="text-danger">{errorIngreso}</p>    
                    :
                        <span></span>
                    }
                    <button className="btn btn-secondary" onClick={manejarVolver}>Volver</button>
                    <button className="btn btn-danger" onClick={() => {manejarCerrar(); manejarVolver();}}>Cancelar</button>
                    {ingreso_por_montos
                        ?
                        <button className="btn btn-secondary" type="button" onClick={manejarCalcular}>Calcular</button>
                       :
                        <button className="btn btn-success" type="submit">Enviar</button>
                    }
                </div>
            </form>
        </div>
    )
};

export default FormularioFactores;