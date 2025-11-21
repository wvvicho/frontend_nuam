import {  Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import FormularioIngreso from "../Formularios/FormularioIngreso"
import FormularioFactores from "../Formularios/FormularioFactores";

function Boton ({nombre, manejarAbrir}) {
    return <div>
        {nombre == "INGRESAR" 
         ?
         <button className="btn btn-primary on" onClick={manejarAbrir}>{nombre}</button>
         :
         <button className="btn bg-white border border-primary text-primary text-nowrap">{nombre}</button>
         }
    </div>
};

function Botones ({mercados, origenes, periodos, urlApi, cambioCalificaciones, calificacionActualizar, manejarActualizar}) {
    const [abrir, setAbrir] = useState(false);
    const [calificacion, setCalificacion] = useState(null);
    const [siguiente, setSiguiente] = useState(false);

    const manejarAbrir = () => setAbrir(true);
    
    const manejarCerrar = () => {
        setCalificacion(null);
        setAbrir(false);
        if (calificacionActualizar) {
            manejarActualizar();
        }
    };

    const manejarSiguiente = (datos) => {
        setCalificacion(datos);
        setSiguiente(true);
    };

    const manejarVolver = () => {
        setSiguiente(false);
    };

    const manejarEnvio = (datos) => {
        setCalificacion(datos);
        manejarCerrar();
    };

    useEffect(() => {
        if (calificacionActualizar != null){
            manejarAbrir();
        }
    }, [calificacionActualizar])

    /*useEffect(() => {
        const API = urlApi;

        if (calificacion) {
            const id = calificacion.id;
            const actualizar = !!id;

            const ingresoCalificacion = async () => {
                try {
                    const url = actualizar ? `${API}/${id}` : API;
                    const metodo = actualizar ? 'PUT' : 'POST';

                    const dataCalificacion = {...calificacion};
                    if (!actualizar) { //Si es POST
                        delete dataCalificacion.id;
                    }

                    const respuesta = await fetch(url, {
                        method: metodo,
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(dataCalificacion),
                    });

                    const calificacionCreada = await respuesta.json();

                    if (calificacionCreada) {
                        console.log(`"Calificación ${actualizar ? 'actualizada' : 'ingresada'} con éxito"`);
                        manejarActualizar();
                        cambioCalificaciones();
                    } else {
                        console.log("Error de ingreso");
                    }
                } catch (error){
                    console.log("Error al ingresar calificación")
                }        
            };
            ingresoCalificacion();
        };
    },[calificacion]);*/


    const estiloModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        p: 4,
        width: '90%',
        maxWidth: '90%',
        height:'auto',
        maxHeight: '90vh',
        overflowY: 'auto',
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
            className="Modal"
            aria-labelledby="modal-titulo"
            aria-describedby="modal-cuerpo"
            >
                <Box sx={estiloModal}>
                    <h2 id="modal-titulo" className="text-primary">Ingresar calificación</h2>
                    <hr />
                    {
                        siguiente ?
                        <FormularioFactores mercados={mercados} manejarCerrar={manejarCerrar} manejarVolver={manejarVolver} manejarEnvio={manejarEnvio} calificacion={calificacion}/> :
                        <FormularioIngreso mercados={mercados} origenes={origenes} periodos={periodos} manejarCerrar={manejarCerrar} calificacionActualizar={calificacionActualizar || calificacion} manejarSiguiente={manejarSiguiente}/>
                    }
                </Box>
            </Modal>
            <Boton nombre={"CARGA POR MONTO"}/>
            <Boton nombre={"CARGA POR FACTOR"}/>
        </div>
    )
};

export default Botones;