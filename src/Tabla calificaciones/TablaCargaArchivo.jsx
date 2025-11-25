import { useState, useRef } from 'react';
import Papa from 'papaparse';

const limpiarConvertirDatos = (csvData) => {
    
    const parseToIntRequired = (val) => {
        const num = parseInt(val);
        if (isNaN(num) || num <= 0) { 
            return 1; //Si no se especifica id en el CSV se reemplazará por 1
        }
        return num;
    };
    
    const parseToInt = (val) => {
        const num = parseInt(val);
        return isNaN(num) ? 0 : num;
    };
    
    const parseToFloat = (val) => {
        const strVal = (val || '0').toString().replace(',', '.');
        const num = parseFloat(strVal); 
        return isNaN(num) ? 0.0 : num;
    };

    const datosLimpios = csvData.map(item => {
        
        let factoresArray = null;
        const factoresString = (item.factores || '').trim();
        
        if (factoresString) {
            try {
                factoresArray = JSON.parse(factoresString); 
            } catch (e) {
                factoresArray = []; 
            }
        } else {
            factoresArray = []; 
        }
        
        return {
            
            mercado: parseToIntRequired(item.mercado), 
            origen: parseToIntRequired(item.origen),
            
            factor_actualizacion: parseToInt(item.factor_actualizacion),
            dividendo: parseToInt(item.dividendo),
            
            valor_historico: parseToFloat(item.valor_historico),
            
            descripcion: (item.descripcion && item.descripcion.trim() !== "") ? item.descripcion : "",
            
            factores: factoresArray,

            ejercicio: parseToInt(item.ejercicio),
            periodo: parseToInt(item.periodo),
            secuencia_evento: parseToInt(item.secuencia_evento),
            anio: parseToInt(item.anio),
            instrumento: item.instrumento,
            fecha_pago: item.fecha_pago,
            fechaActualizacion: item.fechaActualizacion,
        };
    }).filter(item => item.ejercicio); 

    return datosLimpios;
};




function TablaCargaArchivo ({ manejarCerrar, urlCalificaciones }) {
    const [calificaciones, setCalificaciones] = useState([]);
    const [error, setError] = useState(null);
    const [datosPrevios, setDatosPrevios] = useState([]);
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    
    const archivoInputRef = useRef(null);

    const manejarBoton = () => {
        archivoInputRef.current.click();
    };
    

    const manejarArchivo = (e) => {
        setError(null);
        setDatosPrevios([]);
        const archivo = e.target.files[0];

        const nombreArchivo = archivo.name.toLowerCase();

        if (archivo && (archivo.type === 'text/csv' || archivo.type === 'application/csv' || nombreArchivo.endsWith('.csv'))){
            setArchivoSeleccionado(archivo.name);
            
            Papa.parse(archivo, {
                header: true,
                skipEmptyLines: true,
                delimiter: "",
                complete: (resultado) => {
                    const datosLimpios = limpiarConvertirDatos(resultado.data);
                    setCalificaciones(datosLimpios);
                    setDatosPrevios(datosLimpios);
                    console.log("Datos del CSV: ", resultado.data);
                },
                error: (err) => {
                    console.error("Error del CSV: ",err);
                    setError("Error al procesar el archivo CSV, archivo detectado: ", nombreArchivo);
                    setArchivoSeleccionado(null);
                }
            });
        } else {
            setError("Por favor seleccione un archivo CSV válido");
            setCalificaciones(null);
        }
    };

    const ingresarDatosCarga = async (calificaciones) => {
        if (!calificaciones || calificaciones.length == 0){
            setError("Seleccione un archivo primero.")
            return
        }
        try {
            const respuesta = await fetch(urlCalificaciones, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(calificaciones)
            });

            if (respuesta.ok) {
                console.log("Ingreso de datos por carga exitoso");
                setError(null);
            } else {
                console.log(calificaciones);
                console.error("Error al ingresar datos por carga");
            }
           
        } catch (err) {
            console.error("Error en la carga de archivos: ",err);
            setError("Error en la conexión al servidor")
        }
    };

    const obtenerEncabezados = (data) => {
        if (data.length === 0) return [];
        return Object.keys(data[0]);
    }

    return (
        <div>
            <div className='mt-3'>
                    <p>Archivo: <strong>{archivoSeleccionado}</strong>. Se cargarán {datosPrevios.length} registros.</p>

                    <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd' }}>
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    {obtenerEncabezados(datosPrevios).map(header => (
                                        <th key={header}>{header.toUpperCase()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {datosPrevios.slice(0, 15).map((row, index) => ( // Muestra solo las primeras 15 filas
                                    <tr key={index}>
                                        {obtenerEncabezados(datosPrevios).map(header => (
                                            <td key={header}>{row[header] === null ? 'NULL' : String(row[header])}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
            <div className='d-flex align-items-center gap-1 mt-3'>
                <button className="btn btn-danger" onClick={manejarCerrar}>Cancelar</button>
                <button className='btn btn-primary' onClick={manejarBoton}>Ingresar archivo</button>
                {datosPrevios.length > 0 && (
                  <button 
                    className='btn btn-success' 
                    onClick={() => ingresarDatosCarga(calificaciones)}
                  >
                    Ingresar Carga ({calificaciones.length} registros)
                  </button>
                )}
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