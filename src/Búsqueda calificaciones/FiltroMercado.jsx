function FiltroMercado({valorActual, manejarCambio}) {
    const ListaMercadoEj = ["","Mercado1", "Mercado2", "Mercado3"];



    return (
        <div id="Mercado" className="d-flex align-items-center col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-mercado" className="form-label">Mercado</label>
            <select name="mercado" 
                    id="lista-mercado" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarCambio}
                    >
               {ListaMercadoEj.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroMercado;