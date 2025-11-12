function FormIngreso ({mercados}) {
    return (
        <div>
            <form className="form d-flex gap-5">
                <div className="col-lg-5 d-flex flex-column justify-content-start">
                    <label htmlFor="mercados" className="form-label">Mercado</label>
                    <select name="mercados" id="mercados" className="form-select mb-3">
                        <option value="">-</option>
                        {mercados.map( (item, index) => (
                            <option key={index} value="">{item}</option>
                        ))}
                    </select>

                    <label htmlFor="instrumento" className="form-label">Instrumento</label>
                    <input type="text" name="instrumento" id="instrumento" className="form-control mb-3"/>

                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea name="descripcion" id="descripcion" className="form-control mb-3"/>

                    <label htmlFor="fecha_pago" className="form-label">Fecha Pago</label>
                    <input type="date" name="fecha_pago" id="fecha_pago" className="form-control mb-3"/>

                    <label htmlFor="secuencia" className="form-label">Secuencia Evento</label>
                    <input type="text" name="secuencia" id="secuencia" className="form-control mb-3"/>

                    <label htmlFor="dividendo" className="form-label">Dividendo</label>
                    <input type="text" name="dividendo" id="dividendo" className="form-control mb-3"/>

                    <label htmlFor="valor">Valor histórico</label>
                    <input type="text" name="valor" id="valor" className="form-control mb-3"/>
                </div>
                <div className="col-lg-6 d-flex flex-column align-items-start">
                    <label htmlFor="fecha" className="form-label">Fecha de actualización</label>
                    <input type="text" name="fecha" id="fecha" className="form-control mb-3"/>

                    <label htmlFor="año" className="form-label">Año</label>
                    <input type="number" name="año" id="año" className="form-control mb-3"/> 

                    <label htmlFor="isfut" className="form-label">ISFUT</label>
                    <input type="checkbox" name="isfut" id="isfut" className="form-check-input"/>   
                </div>
            </form>
        </div>
    )
};

export default FormIngreso;