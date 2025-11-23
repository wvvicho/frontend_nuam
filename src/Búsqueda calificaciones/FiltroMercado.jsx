function FiltroMercado({valorActual, manejarCambio, mercados}) {

    const manejarSelect = (e) => {
        const id = e.target.value;

        const mercado = mercados.find(item => String(item).id === id);

        const filtro = 
        {
            name: 'mercado',
            id: id,
            nombre: mercado ? mercado.nombre : ''
        };

        manejarCambio(filtro);
    }

    return (
        <div id="Mercado" className="d-flex align-items-center col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-mercado" className="form-label">Mercado</label>
            <select name="mercado" 
                    id="lista-mercado" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarSelect}
                    >
                        <option value={''}></option>
               {mercados.map((item, index) => (
                  <option key={index} value={item.id}>{item.nombre}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroMercado;