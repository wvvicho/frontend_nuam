function FiltroOrigen({valorActual, manejarCambio, origenes}) {

    const manejarSelect = (e) => {
        const id = e.target.value;

        const origen = origenes.find(item => String(item).id === id);

        const filtro = 
        {
            name: 'origen',
            id: id,
            nombre: origen ? origen.nombre : ''
        };

        manejarCambio(filtro);
    };
    
    return (
        <div id="Origen" className="d-flex align-items-center ms-2 col col-lg-3 col-sm-12 col-xs-12">
            <label htmlFor="lista-origen" className="form-label">Origen</label>
            <select name="origen" 
                    id="lista-origen" 
                    className="form-select ms-2"
                    value={valorActual}
                    onChange={manejarSelect
                    }
                    >
                        <option value={''}></option>
               {origenes.map((item, index) => (
                  <option key={index} value={item.id}>{item.nombre}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroOrigen;