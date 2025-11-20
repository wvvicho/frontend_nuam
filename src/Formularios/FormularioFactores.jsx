function FormularioFactores ({manejarCerrar, manejarVolver}) {
    return (
        <div>
            <form className="form">
                <h1>Hola desde formulario de factores</h1>
                <button className="btn btn-secondary" onClick={manejarVolver}>Volver</button>
                <button className="btn btn-danger" onClick={() => {manejarCerrar(); manejarVolver();}}>Cancelar</button>
            </form>
        </div>
    )
};

export default FormularioFactores;