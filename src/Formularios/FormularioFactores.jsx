function FormularioFactores ({manejarCerrar, manejarVolver}) {
    return (
        <div>
            <form className="form">
                <div className="form d-flex justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-between text-nowrap col-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="mercado" className="form-label">Mercado</label>
                            <input type="text" name="mercado" id="mercado" className="form-control w-50 border-black" />
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="fecha_pago" className="form-label">Fecha Pago</label>
                            <input type="text" name="fecha_pago" id="fecha_pago" className="form-control w-50 border-black"/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="año" className="form-label">Año</label>
                            <input type="number" name="año" id="año" className="form-control border-black w-50"/>
                        </div> 
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-center justify-content-between text-nowrap col-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="instrumento" className="form-label">Instrumento</label>
                            <input type="text" name="instrumento" id="instrumento" className="form-control w-50 border-black"/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <textarea name="descripcion" id="descripcion" className="form-control w-50 border-black"/>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-between">
                            <label htmlFor="ingreso_por_montos" className="form-check-label">Ingreso por Montos</label>
                            <input type="checkbox" name="ingreso_por_montos" id="ingreso_por_montos" className="form-check-input border-black"/>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-2 align-items-center text-nowrap col-3">
                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <label htmlFor="valor_historico" className="form-label">Valor Histórico</label>
                            <input type="text" name="valor_historico" id="valor_historico" className="form-control w-50 border-black"/>
                        </div>

                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <label htmlFor="secuencia_evento" className="form-label">Secuencia Evento</label>
                            <input type="text" name="secuencia_evento" id="secuencia_evento" className="form-control w-50 border-black"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    Factores
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