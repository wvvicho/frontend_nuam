function FiltroMercado({valorActual, manejarCambio, mercados}) {


    return (
        <div id="Mercado" className="d-flex align-items-center col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-mercado" className="form-label">Mercado</label>
            <select name="mercado" 
                    id="lista-mercado" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
                        <option></option>
               {mercados.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroMercado;