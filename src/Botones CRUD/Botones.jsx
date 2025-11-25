import {  Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import FormularioIngreso from "../Formularios/FormularioIngreso";
import FormularioFactores from "../Formularios/FormularioFactores";
import TablaCargaArchivo from "../Tabla calificaciones/TablaCargaArchivo";

function Botones ({mercados, origenes, periodos, urlCalificaciones, cambioCalificaciones, calificacionActualizar, manejarActualizar}) {
    
    //Acciones Modal de ingreso
    const [abrirIngreso, setAbrirIngreso] = useState(false);
    const [calificacionIngresar, setCalificacionIngresar] = useState(null);
    const [siguiente, setSiguiente] = useState(false);

    const manejarAbrirIngreso = () => setAbrirIngreso(true);
    
    const manejarCerrarIngreso = () => {
        setAbrirIngreso(false);
        setSiguiente(false);
        setCalificacionIngresar(null);
        
        if (calificacionActualizar) {
            manejarActualizar();
        }
    };

    //Acciones Modal de Carga por Factor
    const [abrirCargaFactor, setAbrirCargaFactor] = useState(false);
    
    const manejarAbrirCargaFactor = () => {
        setAbrirCargaFactor(true);
    };

    const manejarCerrarCargaFactor = () => {
        setAbrirCargaFactor(false);
    };

    const manejarSiguiente = (datos) => {
        setCalificacionIngresar(datos);
        setSiguiente(true);
    };

    const manejarVolver = () => {
        setSiguiente(false);
    };

    const manejarEnvio = (datos) => {
        const actualizar = datos.id !== undefined && datos.id !== null;

        const dataCalificacion = {...datos};
        if (!actualizar){
            delete dataCalificacion.id
        }

        console.log("Manejando envío")
        ingresoCalificacion(dataCalificacion, actualizar);
    };

    useEffect(() => {
        if (calificacionActualizar != null){
            manejarAbrirIngreso();
        }
    }, [calificacionActualizar])

    const ingresoCalificacion = async (dataCalificacion, actualizar) => {
                try {
                    console.log("Se ejecuta");
                    const API = urlCalificaciones;
                    const id = dataCalificacion.id ? dataCalificacion.id : null;
                    const url = actualizar ? `${API}${id}/` : API;
                    const metodo = actualizar ? 'PUT' : 'POST';


                    const respuesta = await fetch(url, {
                        method: metodo,
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(dataCalificacion),
                    });

                    const calificacionCreada = await respuesta.json();

                    if (respuesta.ok) {
                        console.log(`"Calificación ${actualizar ? 'actualizada' : 'ingresada'} con éxito"`);
                        manejarActualizar();
                        cambioCalificaciones();
                        manejarCerrarIngreso();
                    } else {
                        console.log("Error de ingreso: ", calificacionCreada);
                    }
                } catch (error){
                    console.log("Error al ingresar calificación: ",error);
                }        
            };


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
            <button onClick={manejarAbrirIngreso} className="btn btn-primary">INGRESAR</button>
                <Modal
                open={abrirIngreso}
                onClose={manejarCerrarIngreso}
                className="Modal"
                aria-labelledby="modal-titulo"
                aria-describedby="modal-cuerpo"
                >
                    <Box sx={estiloModal}>
                        <h2 id="modal-titulo" className="text-primary">Ingresar calificación</h2>
                        <hr />
                        {
                            siguiente ?
                            <FormularioFactores mercados={mercados} manejarCerrar={manejarCerrarIngreso} manejarVolver={manejarVolver} manejarEnvio={manejarEnvio} calificacion={calificacionIngresar}/> :
                            <FormularioIngreso mercados={mercados} origenes={origenes} periodos={periodos} manejarCerrar={manejarCerrarIngreso} calificacionActualizar={calificacionActualizar || calificacionIngresar} manejarSiguiente={manejarSiguiente}/>
                        }
                    </Box>
                </Modal>
            <button className="btn bg-white border border-primary text-primary text-nowrap">CARGA POR MONTO</button>
            <button className="btn bg-white border border-primary text-primary text-nowrap" onClick={manejarAbrirCargaFactor}>CARGA POR FACTOR</button>
                <Modal
                open={abrirCargaFactor}
                onClose={manejarCerrarCargaFactor}
                className="Modal"
                aria-labelledby="modal-titulo-f"
                aria-describedby="modal-cuerpo"
                >
                    <Box sx={estiloModal}>
                        <h2 id="modal-titulo-f" className="text-primary">Carga Archivo Por Factor</h2>
                        <hr />
                        <TablaCargaArchivo manejarCerrar={manejarCerrarCargaFactor} urlCalificaciones={urlCalificaciones}/>
                    </Box>        
                </Modal>
        </div>
    )
};

export default Botones;