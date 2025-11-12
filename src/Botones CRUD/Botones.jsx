import {  Modal, Box } from "@mui/material";
import { useState } from "react";
import FormIngreso from "../Formularios/FormularioIngreso"

function Boton ({nombre}) {
    return <div>
        <button className="btn bg-white border border-primary text-primary">{nombre}</button>
    </div>
};

function Botones ({mercados}) {

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
        width: '80%',
        height:'90%',
        border:'2px solid lightblue',
        borderRadius:'15px',
        textAlign: 'start',
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
                    <h2 id="modal-titulo" className="text-primary">Ingresar calificación</h2>
                    <hr />
                    <FormIngreso mercados={mercados}/>
                    <button onClick={manejarCerrar} className="btn btn-danger">Cerrar</button>
                </Box>
            </Modal>
            <Boton nombre={"MODIFICAR"}/>
            <Boton nombre={"ELIMINAR"}/>
            <Boton nombre={"COPIAR"}/>
            <Boton nombre={"CARGA POR MONTO"}/>
            <Boton nombre={"CARGA POR FACTOR"}/>
            
        </div>
    )
};

export default Botones;