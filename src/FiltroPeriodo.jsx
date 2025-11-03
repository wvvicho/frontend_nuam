function FiltroPeriodo({valorActual, manejarCambio}) {
    const ListaPeriodoComercialEj = ["PeriodoComercial1", "PeriodoComercial2", "PeriodoComercial3", "PeriodoComercial4", "PeriodoComercial5"]

    return (
        <div id="PeriodoComercial" className="d-flex align-items-center col col-lg-5 col-sm-12 col-xs-12 ms-2 text-nowrap">
            <label htmlFor="lista-periodo" className="form-label">Periodo Comercial</label>
            <select name="periodo" 
                    id="lista-periodo" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaPeriodoComercialEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );

};

export default FiltroPeriodo;