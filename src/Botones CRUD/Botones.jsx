import {  Modal, Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import FormIngreso from "../Formularios/FormularioIngreso"

function Boton ({nombre, manejarAbrir}) {
    return <div>
        {nombre == "INGRESAR" 
         ?
         <button className="btn btn-primary on" onClick={manejarAbrir}>{nombre}</button>
         :
         <button className="btn bg-white border border-primary text-primary">{nombre}</button>
         }
    </div>
};

function Botones ({mercados, origenes, periodos, urlApi}) {
    const [abrir, setAbrir] = useState(false);
    const [calificacion, setCalificacion] = useState(null);

    const manejarAbrir = () => setAbrir(true);
    const manejarCerrar = () => setAbrir(false);
    const manejarEnvio = (datos) => {
        setCalificacion(datos);
        manejarCerrar();
    };

    useEffect(() => {
        const API = urlApi;

        if (calificacion) {
            const ingresoCalificacion = async () => {
                try {
                    const respuesta = await fetch(API, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(calificacion),
                    });

                    const calificacionCreada = await respuesta.json();
                    console.log("POST exitoso: ", calificacionCreada);

                } catch (error){
                    console.log("Error al ingresar calificación")
                }        
            };
            ingresoCalificacion();
        };
    },[calificacion]);


    const estiloModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        p: 4,
        width: '80%',
        height:'80%',
        border:'2px solid lightblue',
        borderRadius:'15px',
        textAlign: 'start',
        boxShadow: '5px 5px 10px 0px black'
    }

    return (
        <div className="d-flex gap-1">
            <Boton nombre={"INGRESAR"} manejarAbrir={manejarAbrir}/>
            <Modal
            open={abrir}
            onClose={manejarCerrar}
            aria-labelledby="modal-titulo"
            aria-describedby="modal-cuerpo"
            >
                <Box sx={estiloModal}>
                    <h2 id="modal-titulo" className="text-primary">Ingresar calificación</h2>
                    <hr />
                    <FormIngreso mercados={mercados} origenes={origenes} periodos={periodos} manejarCerrar={manejarCerrar} manejarEnvio={manejarEnvio}/>
                    
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