import { useEffect, useState } from "react";

function FormularioIngreso ({mercados, origenes, manejarCerrar, calificacionActualizar, manejarSiguiente}) {
    



    const [mercado, setMercado] = useState('');
    const [origen, setOrigen] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [ejercicio, setEjercicio] = useState('');
    const [instrumento, setInstrumento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_pago, setFechaPago] = useState('');
    const [secuencia_evento, setSecuenciaEvento] = useState('');
    const [factor_actualizacion, setFactorActualizacion] = useState('');
    const [dividendo, setDividendo] = useState('');
    const [valor_historico, setValorHistorico] = useState('');
    const [fechaActualizacion, setFechaActualizacion] = useState('');
    const [anio, setAnio] = useState('');
    const [isfut, setISFUT] = useState(false);
    
    const [errorIngreso, setErrorIngreso] = useState(false);

    const limpiarCampos = () => {
        setMercado('');
        setOrigen('');
        setPeriodo('');
        setEjercicio('');
        setInstrumento('');
        setDescripcion('');
        setFechaPago('');
        setSecuenciaEvento('');
        setFactorActualizacion('');
        setDividendo('');
        setValorHistorico('');
        setFechaActualizacion('');
        setAnio('');
        setISFUT(false);
    };

    const manejarInt = (e) => {
        if (e.key === '.' || e.key === ','){
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (calificacionActualizar != null){
            setMercado(calificacionActualizar?.mercado || '');
            setOrigen(calificacionActualizar?.origen || '');
            setPeriodo(calificacionActualizar.periodo || '');
            setEjercicio(calificacionActualizar.ejercicio || '');
            setInstrumento(calificacionActualizar.instrumento || '');
            setDescripcion(calificacionActualizar.descripcion || '');
            setFechaPago(calificacionActualizar.fecha_pago || '');
            setSecuenciaEvento(calificacionActualizar.secuencia_evento || '');
            setFactorActualizacion(calificacionActualizar.factor_actualizacion || '');
            setDividendo(calificacionActualizar.dividendo || '');
            setValorHistorico(calificacionActualizar.valor_historico || '');
            setFechaActualizacion(calificacionActualizar.fechaActualizacion || '');
            setAnio(calificacionActualizar.anio || '');
            setISFUT(calificacionActualizar.isfut || false);
        } else {
            limpiarCampos();
        }
    }, [calificacionActualizar]);

    const siguiente = () => {
        if (
            mercado != '' && 
            origen != '' && 
            periodo != '' && 
            ejercicio != '' && ejercicio >= 1950 &&
            instrumento != '' && instrumento.length == 3 &&
            fecha_pago != '' &&
            secuencia_evento != '' &&
            factor_actualizacion != '' && fechaActualizacion >= fecha_pago &&
            dividendo != '' &&
            valor_historico != '' &&
            fechaActualizacion != '' &&
            anio != '' && anio >= 1950 && anio <= 2025 /*Hay que actualizar esto a fecha actual*/) {
                const Mercado = mercados.find(m => m.id === parseInt(mercado, 10));
                const Origen = origenes.find(o => o.id === parseInt(origen, 10));
                const datos = 
                {
                    id: calificacionActualizar ? calificacionActualizar.id : undefined,
                    mercado: Mercado, 
                    origen: Origen, 
                    periodo,
                    ejercicio, 
                    instrumento, 
                    descripcion, 
                    fecha_pago, 
                    secuencia_evento, 
                    factor_actualizacion, 
                    dividendo, 
                    valor_historico, 
                    fechaActualizacion, 
                    anio, 
                    isfut,
                    factores: calificacionActualizar ? calificacionActualizar.factores : undefined
                };
                console.log(datos);
                manejarSiguiente(datos);
        }else{
            setErrorIngreso("Por favor corrija los siguientes campos:\n\n" +
            "• Ejercicio debe ser mayor a 1950\n" +
            "• Instrumento debe tener 3 caracteres\n" +
            "• La fecha de actualización no puede ser menor a la fecha de pago\n" +
            "• Debe completar todos los campos requeridos") 
        }
    } 
    
    return (
        <div>
            <form className="form d-flex flex-wrap gap-5">

            <div className="col-lg-5">

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Mercado</label>
                    <div className="col-sm-8">
                        <select className="form-control form-control-sm" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                            <option></option>
                            {mercados.map((m, index) => (
                                <option key={index} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Origen</label>
                    <div className="col-sm-8">
                        <select className="form-control form-control-sm" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                            <option></option>
                            {origenes.map((o, index) => (
                                <option key={index} value={o.id}>{o.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Periodo</label>
                    <div className="col-sm-8">
                        <input type="number" step="1" className="form-control form-control-sm" onKeyDown={manejarInt} value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Ejercicio</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" onKeyDown={manejarInt} value={ejercicio} onChange={(e) => setEjercicio(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Instrumento</label>
                    <div className="col-8">
                        <input type="text" className="form-control form-control-sm" value={instrumento} onChange={(e) => setInstrumento(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Descripción</label>
                    <div className="col-8">
                        <textarea className="form-control form-control-sm" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Fecha Pago</label>
                    <div className="col-8">
                        <input type="date" className="form-control form-control-sm" value={fecha_pago} onChange={(e) => setFechaPago(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Secuencia</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" onKeyDown={manejarInt} value={secuencia_evento} onChange={(e) => setSecuenciaEvento(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Dividendo</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" onKeyDown={manejarInt} value={dividendo} onChange={(e) => setDividendo(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Valor histórico</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" value={valor_historico} onChange={(e) => setValorHistorico(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="col-lg-6">

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Factor actualización</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" onKeyDown={manejarInt} value={factor_actualizacion} onChange={(e) => setFactorActualizacion(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Fecha actualización</label>
                    <div className="col-8">
                        <input type="date" className="form-control form-control-sm" value={fechaActualizacion} onChange={(e) => setFechaActualizacion(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">Año</label>
                    <div className="col-8">
                        <input type="number" className="form-control form-control-sm" onKeyDown={manejarInt} value={anio} onChange={(e) => setAnio(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <label className="col-sm-4 col-form-label">ISFUT</label>
                    <div className="col-8">
                        <input type="checkbox" className="form-check-input border-black" checked={isfut} onChange={(e) => setISFUT(e.target.checked)} />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 w-100">
                    <button className="btn btn-danger" type="button" onClick={manejarCerrar}>Cancelar</button>
                    <button className="btn btn-primary" type="button" onClick={siguiente}>Siguiente</button>
                </div>

                {errorIngreso && (
                    <p className="text-danger mt-3" style={{ whiteSpace: "pre-line", fontSize: "19px" }}>
                        {errorIngreso}
                    </p>
                )}

                </div>
            </form>

        </div>
    )
};

export default FormularioIngreso;