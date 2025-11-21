import { useEffect, useState } from "react";

function FormularioIngreso ({mercados, origenes, periodos, manejarCerrar, manejarEnvio, calificacionActualizar, manejarSiguiente}) {
    


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
    const [año, setAño] = useState('');
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
        setAño('');
        setISFUT(false);
    };

    useEffect(() => {
        if (calificacionActualizar != null){
            setMercado(calificacionActualizar.mercado || '');
            setOrigen(calificacionActualizar.origen || '');
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
            setAño(calificacionActualizar.año || '');
            setISFUT(calificacionActualizar.isfut || false);
        } else {
            limpiarCampos();
        }
    }, [calificacionActualizar]);

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (
            mercado != '' && 
            origen != '' && 
            periodo != '' && 
            ejercicio != '' && 
            instrumento != '' && 
            fecha_pago != '' &&
            secuencia_evento != '' &&
            factor_actualizacion != '' &&
            dividendo != '' &&
            valor_historico != '' &&
            fechaActualizacion != '' &&
            año != '') {
                const datos = 
                {
                    id: calificacionActualizar ? calificacionActualizar.id : undefined,
                    mercado, 
                    origen, 
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
                    año, 
                    isfut
                };
                console.log(datos);
                manejarEnvio(datos);
        }else{
            setErrorIngreso("Por favor rellene todos los campos necesarios.")
        }
    } 
    
    return (
        <div>
            <form className="form d-flex flex-wrap gap-5" onSubmit={manejarSubmit}>
                <div className="col-lg-5 d-flex flex-column justify-content-start">
                    <label htmlFor="mercados" className="form-label">Mercado</label>
                    <select name="mercados" id="mercados" className="form-select mb-3 border-black" value={mercado} onChange={(e) => setMercado(e.target.value)}>
                        <option></option>
                        {mercados.map( (item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>

                    <label htmlFor="origenes" className="form-label">Origen</label>
                    <select name="origenes" id="origenes" className="form-select mb-3 border-black" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                        <option></option>
                        {origenes.map( (item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>

                    <label htmlFor="periodos" className="form-label">Periodo</label>
                    <select name="periodos" id="periodos" className="form-select mb-3 border-black" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                        <option></option>
                        {periodos.map( (item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>

                    <label htmlFor="ejercicio" className="form-label">Ejercicio</label>
                    <input type="number" name="ejercicio" id="ejercicio" className="form-control mb-3 border-black" value={ejercicio} onChange={(e) => setEjercicio(e.target.value)}/>

                    <label htmlFor="instrumento" className="form-label">Instrumento</label>
                    <input type="text" name="instrumento" id="instrumento" className="form-control mb-3 border-black" value={instrumento} onChange={(e) => setInstrumento(e.target.value)}/>

                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea name="descripcion" id="descripcion" className="form-control mb-3 border-black" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>

                    <label htmlFor="fecha_pago" className="form-label">Fecha Pago</label>
                    <input type="date" name="fecha_pago" id="fecha_pago" className="form-control mb-3 border-black" value={fecha_pago} onChange={(e) => setFechaPago(e.target.value)}/>

                    <label htmlFor="secuencia" className="form-label">Secuencia Evento</label>
                    <input type="number" name="secuencia" id="secuencia" className="form-control mb-3 border-black"  value={secuencia_evento} onChange={(e) => setSecuenciaEvento(e.target.value)}/>

                    <label htmlFor="dividendo" className="form-label">Dividendo</label>
                    <input type="number" name="dividendo" id="dividendo" className="form-control mb-3 border-black" value={dividendo} onChange={(e) => setDividendo(e.target.value)}/>

                    <label htmlFor="valor">Valor histórico</label>
                    <input type="number" name="valor" id="valor" className="form-control mb-3 border-black" value={valor_historico} onChange={(e) => setValorHistorico(e.target.value)}/>
                </div>

                <div className="col-lg-6 d-flex flex-column align-items-start">

                    <label htmlFor="factor_actualizacion" className="form-label">Factor actualización</label>
                    <input type="number" name="factor_actualizacion" id="factor_actualizacion" className="form-control mb-3 border-black" value={factor_actualizacion} onChange={(e) => setFactorActualizacion(e.target.value)}/>   

                    <label htmlFor="fecha_actualizacion" className="form-label">Fecha de actualización</label>
                    <input type="date" name="fecha_actualizacion" id="fecha_actualizacion" className="form-control mb-3 border-black" value={fechaActualizacion} onChange={(e) => setFechaActualizacion(e.target.value)}/>

                    <label htmlFor="año" className="form-label">Año</label>
                    <input type="number" name="año" id="año" className="form-control mb-3 border-black" value={año} onChange={(e) => setAño(e.target.value)}/> 

                    <label htmlFor="isfut" className="form-label">ISFUT</label>
                    <input type="checkbox" name="isfut" id="isfut" className="form-check-input border-black" value={isfut} onChange={(e) => setISFUT(e.target.checked)} checked={isfut}/> 

                    <div className="d-flex flex-row gap-2 justify-content-end w-100 flex-wrap mt-3">
                        <button onClick={manejarCerrar} className="btn btn-danger">Cancelar</button>
                        <button type="submit" className="btn btn-success">Ingresar</button>
                        <button className="btn btn-primary" onClick={manejarSiguiente}>Siguiente</button>
                        {errorIngreso ?
                        <h1 className="text-danger">{errorIngreso}</h1>
                        :
                        <span></span>
                        }
                    </div>  
                </div>
            </form>
        </div>
    )
};

export default FormularioIngreso;