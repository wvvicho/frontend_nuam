function FiltroPendiente({valorActual, manejarCambio}) {
    return (
        <div id="Pendiente">
            <label htmlFor="pendiente">Calificación Pendiente</label>
            <input type="checkbox" 
                    name="pendiente" 
                    id="pendiente" 
                    checked={valorActual}
                    onChange={manejarCambio}
                    className="ms-2"/>
        </div>
    )
}

export default FiltroPendiente;