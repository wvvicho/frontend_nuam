function FiltroPeriodo({valorActual, manejarCambio, periodos}) {

    const manejarSelect = (e) => {

        const periodo = e.target.value

        const filtro = 
        {
            name: 'periodo',
            value: periodo
        };

        manejarCambio(filtro);
    }
    
    return (
        <div id="PeriodoComercial" className="d-flex align-items-center col col-lg-5 col-sm-12 col-xs-12 ms-2 text-nowrap">
            <label htmlFor="lista-periodo" className="form-label">Periodo Comercial</label>
            <select name="periodo" 
                    id="lista-periodo" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarSelect}
                    >
                        <option value={''}></option>
               {periodos.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );

};

export default FiltroPeriodo;