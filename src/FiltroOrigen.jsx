function FiltroOrigen({valorActual, manejarCambio}) {
    const ListaOrigenEj = ["Origen1", "Origen2", "Origen3", "Origen4", "Origen5"]

    return (
        <div id="Origen" className="d-flex align-items-center ms-2 col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-origen" className="form-label">Origen</label>
            <select name="origen" 
                    id="lista-origen" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaOrigenEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroOrigen;