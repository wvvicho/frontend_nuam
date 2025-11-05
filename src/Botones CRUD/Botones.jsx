import  Modal  from "@mui/material/Modal";
import { useState } from "react";


function Botones ({ manejarBotonIngreso }) {

    const [abrir, setAbrir] = useState(false);

    const manejarAbrir = () => setAbrir(true);
    const manejarCerrar = () => setAbrir(false);



    return (
        <div className="d-flex gap-1">
            <button className="btn btn-primary on" onClick={manejarAbrir}>INGRESAR</button>
            <Modal
            className="modal-dialog modal-xl"
            open={abrir}
            onClose={manejarCerrar}
            aria-labelledby="modal-titulo"
            aria-describedby="modal-cuerpo"
            >
                <div>
                    <h1 id="modal-titulo">MODAL DE INGRESO</h1>
                    <p id="modal-cuerpo">Este es un modal de prueba</p>
                    <button onClick={manejarCerrar}>CERRAR</button>
                </div>
            </Modal>
            <button className="btn bg-white border border-primary text-primary">MODIFICAR</button>
            <button className="btn bg-white border border-primary text-primary">ELIMINAR</button>
            <button className="btn bg-white border border-primary text-primary">COPIAR</button>
            <button className="btn bg-white border border-primary text-primary">CARGA POR MONTO</button>
            <button className="btn bg-white border border-primary text-primary">CARGA POR FACTOR</button>
        </div>
    )
};

export default Botones;