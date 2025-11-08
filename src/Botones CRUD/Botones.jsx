import {  Modal, Box } from "@mui/material";
import { useState } from "react";


function Botones ({ manejarBotonIngreso }) {

    const [abrir, setAbrir] = useState(false);

    const manejarAbrir = () => setAbrir(true);
    const manejarCerrar = () => setAbrir(false);

    const estiloModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        p: 4,
        width: '70%',
        height:'70%',
        border:'2px solid lightblue',
        borderRadius:'15px',
        textAlign: 'center',
        boxShadow: '5px 5px 10px 0px black'
    }

    return (
        <div className="d-flex gap-1">
            <button className="btn btn-primary on" onClick={manejarAbrir}>INGRESAR</button>
            <Modal
            open={abrir}
            onClose={manejarCerrar}
            aria-labelledby="modal-titulo"
            aria-describedby="modal-cuerpo"
            >
                <Box sx={estiloModal}>
                    <h1 id="modal-titulo">MODAL DE PRUEBA</h1>
                    <p id="modal-cuerpo">Este es el texto del Modal de prueba</p>
                    <button onClick={manejarCerrar} className="btn btn-danger">Cerrar</button>
                </Box>
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