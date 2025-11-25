import { useState, useRef } from 'react';
import Papa from 'papaparse';

function TablaCargaArchivo ({ manejarCerrar, urlCalificaciones }) {
    const [calificaciones, setCalificaciones] = useState([]);
    const [error, setError] = useState(null);

    
    const archivoInputRef = useRef(null);

    const manejarBoton = () => {
        archivoInputRef.current.click();
    };
    

    const manejarArchivo = (e) => {
        setError(null);

        const archivo = e.target.files[0];

        const nombreArchivo = archivo.name.toLowerCase();

        if (archivo && (archivo.type === 'text/csv' || archivo.type === 'application/csv' || nombreArchivo.endsWith('.csv'))){
            Papa.parse(archivo, {
                header: true,
                skipEmptyLines: true,
                delimiter: "",
                complete: (resultado) => {
                    setCalificaciones(resultado.data);
                    console.log("Datos del CSV: ", resultado.data);
                },
                error: (err) => {
                    console.error("Error del CSV: ",err);
                    setError("Error al procesar el archivo CSV, archivo detectado: ", nombreArchivo);
                }
            });
        } else {
            setError("Por favor seleccione un archivo CSV válido");
            setCalificaciones([]);
        }
    };

    const ingresarDatosCarga = async (calificaciones) => {
        if (!calificaciones || calificaciones.length == 0){
            setError("Seleccione un archivo primero.")
            return
        }

        const datosLimpios = calificaciones.map(item => {

            const parseToInt = val => (val ? parseInt(val): 0);
            const parseToFloat = val => (val ? parseFloat(val.toString().replace(',','.')) : 0.0);

            let listaFactores = [];
            try {
                listaFactores = JSON.parse(item.factores);
            } catch (err) {
                console.error("Error al intentar parsear factores a JSON");
                listaFactores = [];
            }

            return {
                ejercicio: parseToInt(item.ejercicio),
                periodo: parseToInt(item.periodo),
                secuencia_evento: parseToInt(item.secuencia_evento),
                factor_actualizacion: parseToInt(item.factor_actualizacion),
                dividendo: parseToInt(item.dividendo),
                valor_historico: parseToFloat(item.valor_historico),
                anio: parseToInt(item.anio),

                mercado: parseToInt(item.mercado),
                origen: parseToInt(item.origen),
                
                factores: item.factores,

                instrumento: item.instrumento,
                fecha_pago: item.fecha_pago,
                fechaActualizacion: item.fechaActualizacion,
                descripcion: item.descripcion.length > 0 ? item.descripcion : null,
            }
        });

        try {
            const respuesta = await fetch(urlCalificaciones, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosLimpios)
            });

            if (respuesta.ok) {
                console.log("Ingreso de datos por carga exitoso");
                setError(null);
            } else {
                console.log(datosLimpios);
                console.error("Error al ingresar datos por carga");
            }
           
        } catch (err) {
            console.error("Error en la carga de archivos: ",err);
        }
    };

    return (
        <div>
            <h1>Hola desde Tabla Carga Archivo</h1>
            <div className='d-flex align-items-center gap-1'>
                <button className="btn btn-danger" onClick={manejarCerrar}>Cancelar</button>
                <button className='btn btn-primary' onClick={manejarBoton}>Ingresar archivo</button>
                <button className='btn btn-success' onClick={() => ingresarDatosCarga(calificaciones)}>Ingresar</button>
                <input type="file" accept='.csv' onChange={manejarArchivo} className='d-none' ref={archivoInputRef}/>
                {error 
                ? 
                    <span className='text-danger'>{error}</span>
                :
                    <span></span>
                }
            </div>
        </div>
    )
};

export default TablaCargaArchivo;