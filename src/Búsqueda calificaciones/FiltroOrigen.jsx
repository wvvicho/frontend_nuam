function FiltroOrigen({valorActual, manejarCambio, origenes}) {

    return (
        <div id="Origen" className="d-flex align-items-center ms-2 col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-origen" className="form-label">Origen</label>
            <select name="origen" 
                    id="lista-origen" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
                        <option></option>
               {origenes.map((item, index) => (
                  <option key={index}>{item.nombre}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroOrigen;